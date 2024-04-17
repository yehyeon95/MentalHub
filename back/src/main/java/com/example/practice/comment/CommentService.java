package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.comment.commentDto.MyComments;
import com.example.practice.content.Content;
import com.example.practice.content.ContentService;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.reply.Reply;
import com.example.practice.reply.ReplyRepository;
import com.example.practice.vote.VoteService;
import com.example.practice.vote.commentvote.CommentVoteRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final EntityManager em;
    private final MemberService memberService;
    private final ContentService contentService;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final VoteService voteService;


    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }

    public Comment createComment(Authentication authentication, CommentPostDto commentPostDto){
        Comment comment = new Comment();

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        Content content = contentService.findVerifiedContent(commentPostDto.getContentId());

        comment.setCommentBody(commentPostDto.getCommentBody());
        comment.setMember(member);
        comment.setContent(content);
        comment.setDeleted(false);

        Comment savedComment = commentRepository.save(comment);

        return savedComment;
    }
    public Comment updateComment(CommentPostDto commentPostDto, long commentId, Authentication authentication){
        long memberId = extractMemberId(authentication);

        Comment comment = em.find(Comment.class, commentId);

        if(memberId==comment.getMember().getMemberId()){
            comment.setCommentBody(commentPostDto.getCommentBody());
        }
        else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);

        return commentRepository.save(comment);
    }

    public Comment deleteComment(long commentId, Authentication authentication){
        long memberId = extractMemberId(authentication);

        Comment comment = em.find(Comment.class, commentId);

        //comment 삭제시 정보는 그대로. 바디만 삭제
        if(memberId==comment.getMember().getMemberId()){
            comment.setCommentBody("삭제된 댓글입니다.");
            comment.setDeleted(true);
        }
        else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);
        return commentRepository.save(comment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findByCommentId(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));
        return findComment;
    }

    public MyComments getMyComments(Authentication authentication){
        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        List<Comment> myCommentsList = commentRepository.findAllByMember(member);
        List<Reply> myRepliesList = replyRepository.findAllByMember(member);

        long commentsCnt = getMyCommentsCnt(authentication);

        MyComments myComments = new MyComments(myCommentsList, myRepliesList,commentsCnt);

        return myComments;
    }

    public long getMyCommentsCnt(Authentication authentication){
        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        long commentsCnt = commentRepository.countAllByMember(member)+ replyRepository.countAllByMember(member);

        return commentsCnt;
    }
    public long getMyCommentsVoteCnt(Authentication authentication){
        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        List<Comment> myCommentsList = commentRepository.findAllByMember(member);
        List<Reply> myRepliesList = replyRepository.findAllByMember(member);

        long cnt = 0;
        for(Comment comment : myCommentsList){
            cnt = cnt + voteService.countCommentVotes(comment);
        }
        for(Reply reply : myRepliesList){
            cnt = cnt + voteService.countReplyVotes(reply);
        }

        return cnt;
    }

}
