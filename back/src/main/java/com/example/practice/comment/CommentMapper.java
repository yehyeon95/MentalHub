package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.comment.commentDto.CommentResponseDtoNotUser;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.example.practice.reply.ReplyService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentMapper {
    private final ReplyService replyService;

    public CommentMapper(ReplyService replyService){
        this.replyService = replyService;
    }
    public CommentResponseDto CommentToCommentResponseDto(Comment comment, List<Reply> replies, long commentVotesCnt, boolean isVoted, Member member){
        return new CommentResponseDto(
                comment.getCommentId(),
                comment.getMember().getMemberId(),
                comment.getMember().getNickname(),
                comment.getContent().getContentId(),
                comment.getCreated_at(),
                comment.getCommentBody(),
                comment.isDeleted(),
                commentVotesCnt,
                isVoted,
                replyService.replyListToReplyResponseList(replies,member)
                );
    }
    public CommentResponseDtoNotUser CommentToCommentResponseDtoNotUser(Comment comment, List<Reply> replies, long commentVotesCnt){
        return new CommentResponseDtoNotUser(
                comment.getCommentId(),
                comment.getMember().getMemberId(),
                comment.getMember().getNickname(),
                comment.getContent().getContentId(),
                comment.getCreated_at(),
                comment.getCommentBody(),
                comment.isDeleted(),
                commentVotesCnt,
                replyService.replyListToReplyResponseListNotUser(replies)
                );
    }

}
