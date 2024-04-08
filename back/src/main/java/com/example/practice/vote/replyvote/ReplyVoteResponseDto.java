package com.example.practice.vote.replyvote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReplyVoteResponseDto {
    private long memberId;
    private long replyId;
}
