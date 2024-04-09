package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.reply.dto.ReplyResponseDto;
import com.example.practice.reply.dto.ReplyResponseDtoNotUser;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReplyMapper {
    public ReplyResponseDto ReplyToReplyResponseDto(Reply reply, long replyVotesCnt, boolean isVoted){
        return new ReplyResponseDto(
                reply.getReplyId(),
                reply.getMember().getMemberId(),
                reply.getMember().getNickname(),
                reply.getContent().getContentId(),
                reply.getComment().getCommentId(),
                reply.getReplyBody(), 
                reply.getCreated_at(),
                replyVotesCnt,
                isVoted,
                reply.isDeleted());
    }
    public ReplyResponseDtoNotUser ReplyToReplyResponseDtoNotUser(Reply reply, long replyVotesCnt){
        return new ReplyResponseDtoNotUser(
                reply.getReplyId(),
                reply.getMember().getMemberId(),
                reply.getMember().getNickname(),
                reply.getContent().getContentId(),
                reply.getComment().getCommentId(),
                reply.getReplyBody(),
                reply.getCreated_at(),
                replyVotesCnt,
                reply.isDeleted());
    }
}

