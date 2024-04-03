package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.reply.dto.ReplyResponseDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReplyMapper {
    public ReplyResponseDto ReplyToReplyResponseDto(Reply reply){
        return new ReplyResponseDto(
                reply.getReplyId(),
                reply.getMember().getMemberId(),
                reply.getContent().getContentId(),
                reply.getComment().getCommentId(),
                reply.getReplyBody(), 
                reply.getCreated_at(),
                reply.getVotes(),
                reply.isDeleted());
    }
}

