package com.example.practice.vote.contentvote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ContentVoteResponseDto {
    private long contentVoteId;
    private long memberId;
    private long contentId;

}
