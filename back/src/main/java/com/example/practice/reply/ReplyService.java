package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentRepository;
import com.example.practice.comment.CommentService;
import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.content.Content;
import com.example.practice.content.ContentService;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.reply.dto.ReplyPostDto;
import com.example.practice.reply.dto.ReplyResponseDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReplyService {
    private final EntityManager em;
    private final MemberService memberService;
    private final ContentService contentService;
    private final CommentService commentService;
    private final ReplyRepository replyRepository;
    private final ReplyMapper replyMapper;

    public ReplyService(EntityManager em,
                          MemberService memberService,
                          ContentService contentService,
                          ReplyRepository replyRepository,
                        CommentService commentService,
                        ReplyMapper replyMapper){
        this.em = em;
        this.memberService = memberService;
        this.contentService = contentService;
        this.replyRepository = replyRepository;
        this.commentService = commentService;
        this.replyMapper = replyMapper;
    }
    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }

    public Reply createReply(Authentication authentication, ReplyPostDto replyPostDto){
        Reply reply = new Reply();

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        Content content = contentService.findVerifiedContent(replyPostDto.getContentId());

        Comment comment = commentService.findVerifiedComment(replyPostDto.getCommentId());

        reply.setReplyBody(replyPostDto.getReplyBody());
        reply.setMember(member);
        reply.setContent(content);
        reply.setComment(comment);
        reply.setDeleted(false);

        Reply savedReply = replyRepository.save(reply);

        return savedReply;
    }
    public Reply updateReply(ReplyPostDto replyPostDto, long replyId, Authentication authentication){
        long memberId = extractMemberId(authentication);

        Reply reply = em.find(Reply.class, replyId);

        if(memberId==reply.getMember().getMemberId()){
            reply.setReplyBody(replyPostDto.getReplyBody());
        }
        else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);

        return replyRepository.save(reply);
    }

    public Reply deleteReply(long replyId, Authentication authentication){
        long memberId = extractMemberId(authentication);

        Reply reply = em.find(Reply.class, replyId);

        if(memberId==reply.getMember().getMemberId()){
            reply.setReplyBody("삭제된 댓글입니다.");
            reply.setDeleted(true);
        }
        else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);
        return replyRepository.save(reply);
    }

    public List<ReplyResponseDto> mapReplies(List<Reply> replies){
        List<ReplyResponseDto> resultReplies =
                replies.stream()
                        .map(reply-> replyMapper.ReplyToReplyResponseDto(reply))
                        .collect(Collectors.toList());
        return resultReplies;
    }

}
