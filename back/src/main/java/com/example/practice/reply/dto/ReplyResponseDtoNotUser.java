package com.example.practice.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
public class ReplyResponseDtoNotUser {
    private long replyId;
    private long memberId;
    private String nickname;
    private long contentId;
    private long commentId;
    private String replyBody;
    private LocalDateTime created_at;
    private long ReplyVotesCnt;
    private boolean deleted;
}
