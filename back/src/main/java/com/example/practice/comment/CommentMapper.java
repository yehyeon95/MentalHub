package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.content.Content;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.reply.Reply;
import com.example.practice.reply.ReplyMapper;
import com.example.practice.reply.ReplyService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {
    private final ReplyService replyService;

    public CommentMapper(ReplyService replyService){
        this.replyService = replyService;
    }
    public CommentResponseDto CommentToCommentResponseDto(Comment comment, List<Reply> replies){
        return new CommentResponseDto(
                comment.getCommentId(),
                comment.getMember().getMemberId(),
                comment.getContent().getContentId(),
                comment.getCreated_at(),
                comment.getCommentBody(),
                comment.isDeleted(),
                replyService.mapReplies(replies));
    }
}
