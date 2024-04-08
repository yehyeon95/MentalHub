package com.example.practice.vote.replyvote;

import com.example.practice.vote.contentvote.ContentVote;
import com.example.practice.vote.contentvote.ContentVoteResponseDto;
import org.springframework.stereotype.Component;

@Component
public class ReplyVoteMapper {
    public ReplyVoteResponseDto replyVoteToResponse(ReplyVote replyVote){
        return new ReplyVoteResponseDto(
                replyVote.getMember().getMemberId(),
                replyVote.getReply().getReplyId());
    }
}
