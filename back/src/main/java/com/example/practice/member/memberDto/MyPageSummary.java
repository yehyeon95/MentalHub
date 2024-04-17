package com.example.practice.member.memberDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MyPageSummary {
    long contentsCnt;
    long contentsVoteCnt;
    long commentsCnt;
    long commentsVoteCnt;
}
