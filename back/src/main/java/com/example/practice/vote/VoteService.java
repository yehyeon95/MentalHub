package com.example.practice.vote;


import com.example.practice.comment.Comment;
import com.example.practice.content.Content;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.example.practice.vote.commentvote.CommentVote;
import com.example.practice.vote.commentvote.CommentVoteMapper;
import com.example.practice.vote.commentvote.CommentVoteRepository;
import com.example.practice.vote.commentvote.CommentVoteResponseDto;
import com.example.practice.vote.contentvote.ContentVote;
import com.example.practice.vote.contentvote.ContentVoteMapper;
import com.example.practice.vote.contentvote.ContentVoteRepository;
import com.example.practice.vote.contentvote.ContentVoteResponseDto;
import com.example.practice.vote.replyvote.ReplyVote;
import com.example.practice.vote.replyvote.ReplyVoteMapper;
import com.example.practice.vote.replyvote.ReplyVoteRepository;
import com.example.practice.vote.replyvote.ReplyVoteResponseDto;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class VoteService {
    private final ContentVoteRepository contentVoteRepository;
    private final ContentVoteMapper contentVoteMapper;
    private final CommentVoteRepository commentVoteRepository;
    private final CommentVoteMapper commentVoteMapper;
    private final ReplyVoteRepository replyVoteRepository;
    private final ReplyVoteMapper replyVoteMapper;
    private final EntityManager em;


    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }
    //게시글 추천
    public ContentVoteResponseDto CreateContentVote(Authentication authentication, long contentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Content content = em.find(Content.class, contentId);

        boolean isExist = contentVoteRepository.existsByMemberAndContent(member, content);
        if(isExist){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        else{
        ContentVote contentVote = new ContentVote();

        contentVote.setMember(member);
        contentVote.setContent(content);

        ContentVote savedVote = contentVoteRepository.save(contentVote);
        return contentVoteMapper.contentVoteToResponse(savedVote);
        }
    }

    //게시글 추천 취소
    public void deleteContentVote(Authentication authentication, long contentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Content content = em.find(Content.class, contentId);

        ContentVote contentVote = findVerifiedContentVote(member, content);
        contentVoteRepository.delete(contentVote);
    }

    //댓글 추천
    public CommentVoteResponseDto CreateCommentVote(Authentication authentication, long commentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Comment comment = em.find(Comment.class, commentId);

        boolean isExist = commentVoteRepository.existsByMemberAndComment(member, comment);
        if(isExist){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        else{
            CommentVote commentVote = new CommentVote();

            commentVote.setMember(member);
            commentVote.setComment(comment);

            CommentVote savedVote = commentVoteRepository.save(commentVote);
            return commentVoteMapper.commentVoteToResponse(savedVote);
        }
    }
    //댓글 추천 취소
    public void deleteCommentVote(Authentication authentication, long commentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Comment comment = em.find(Comment.class, commentId);

        CommentVote commentVote = findVerifiedCommentVote(member, comment);
        commentVoteRepository.delete(commentVote);
    }

    //대댓글 추천
    public ReplyVoteResponseDto CreateReplyVote(Authentication authentication, long replyId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Reply reply = em.find(Reply.class, replyId);

        boolean isExist = replyVoteRepository.existsByMemberAndReply(member, reply);
        if(isExist){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        else{
            ReplyVote replyVote = new ReplyVote();

            replyVote.setMember(member);
            replyVote.setReply(reply);

            ReplyVote savedVote = replyVoteRepository.save(replyVote);
            return replyVoteMapper.replyVoteToResponse(savedVote);
        }
    }
    public void deleteReplyVote(Authentication authentication, long replyId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Reply reply = em.find(Reply.class, replyId);

        ReplyVote replyVote = findVerifiedReplyVote(member, reply);
        replyVoteRepository.delete(replyVote);
    }

    //게시글 추천이 있는지 확인
    public ContentVote findVerifiedContentVote(Member member, Content content) {
        Optional<ContentVote> optionalContentVote =
                contentVoteRepository.findByMemberAndContent(member, content);
        ContentVote findContentVote =
                optionalContentVote.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
        return findContentVote;
    }

    //댓글 추천이 있는지 확인
    public CommentVote findVerifiedCommentVote(Member member, Comment comment) {
        Optional<CommentVote> optionalCommentVote =
                commentVoteRepository.findByMemberAndComment(member, comment);
        CommentVote findCommentVote =
                optionalCommentVote.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
        return findCommentVote;
    }
    //대댓글 추천이 있는지 확인
    public ReplyVote findVerifiedReplyVote(Member member, Reply reply) {
        Optional<ReplyVote> optionalReplyVote =
                replyVoteRepository.findByMemberAndReply(member, reply);
        ReplyVote findReplyVote =
                optionalReplyVote.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
        return findReplyVote;
    }





}
