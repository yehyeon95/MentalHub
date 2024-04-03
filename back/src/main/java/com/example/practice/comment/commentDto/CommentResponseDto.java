package com.example.practice.comment.commentDto;

import com.example.practice.comment.Comment;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.example.practice.reply.dto.ReplyResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;
    private long memberId;
    private String nickname;
    private long contentId;
    private LocalDateTime created_at;
    private String commentBody;
    private boolean deleted;
    private List<ReplyResponseDto> replies;

}
