package com.example.practice.comment.commentDto;

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
    private long CommentVotesCnt;
    private boolean isVoted;
    private List<ReplyResponseDto> replies;


}
