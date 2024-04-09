package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.member.Member;
import com.example.practice.member.memberDto.MemberResponseDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ContentMapper {

    public ContentResponseDto ContentToContentResponseDto(Content content, long commentsCount, long contentVotes, boolean isVoted){
        return new ContentResponseDto(
                content.getContentId(),
                content.getMember().getMemberId(),
                content.getMember().getNickname(),
                content.getTitle(),
                content.getBody(),
                content.getFont(),
                content.getFontSize(),
                content.getCreatedAt(),
                content.getModifiedAt(),
                content.getViews(),
                contentVotes,
                isVoted,
                content.getType(),
                commentsCount,
                content.isModified()
        );
    }
}
