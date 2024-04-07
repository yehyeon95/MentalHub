package com.example.practice.vote.contentvote;

import com.example.practice.member.Member;
import com.example.practice.member.memberDto.MemberPostDto;
import org.springframework.stereotype.Component;

@Component
public class ContentVoteMapper {

    public ContentVoteResponseDto contentVoteToResponse(ContentVote contentVote){
        return new ContentVoteResponseDto(
                contentVote.getContentVoteId(),
                contentVote.getMember().getMemberId(),
                contentVote.getContent().getContentId());
    }
}
