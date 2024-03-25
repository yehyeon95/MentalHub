package com.example.practice.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ReplyResponseDto {
    private long replyId;
    private long memberId;
    private long contentId;
    private long commentId;
    private String replyBody;
    private LocalDateTime created_at;
    private long votes;
}
