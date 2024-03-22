package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentRepository;
import com.example.practice.comment.CommentService;
import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.content.Content;
import com.example.practice.content.ContentService;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.reply.dto.ReplyPostDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReplyService {
    private final EntityManager em;
    private final MemberService memberService;
    private final ContentService contentService;
    private final CommentService commentService;
    private final ReplyRepository replyRepository;

    public ReplyService(EntityManager em,
                          MemberService memberService,
                          ContentService contentService,
                          ReplyRepository replyRepository,
                        CommentService commentService){
        this.em = em;
        this.memberService = memberService;
        this.contentService = contentService;
        this.replyRepository = replyRepository;
        this.commentService = commentService;
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

        Reply savedReply = replyRepository.save(reply);

        return savedReply;
    }

}
