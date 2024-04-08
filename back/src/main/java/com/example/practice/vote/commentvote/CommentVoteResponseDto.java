package com.example.practice.vote.commentvote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentVoteResponseDto {
    private long commentVoteId;
    private long memberId;
    private long commentId;
}
