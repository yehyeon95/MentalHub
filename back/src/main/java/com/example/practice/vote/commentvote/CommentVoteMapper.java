package com.example.practice.vote.commentvote;

import com.example.practice.vote.contentvote.ContentVote;
import com.example.practice.vote.contentvote.ContentVoteResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
public class CommentVoteMapper {
    public CommentVoteResponseDto commentVoteToResponse(CommentVote commentVote){
        return new CommentVoteResponseDto(
                commentVote.getCommentVoteId(),
                commentVote.getMember().getMemberId(),
                commentVote.getComment().getCommentId());
    }
}
