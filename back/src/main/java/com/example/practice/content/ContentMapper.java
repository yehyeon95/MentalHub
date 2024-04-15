package com.example.practice.content;

import com.example.practice.content.ContentDto.response.ContentResponseDto;
import org.springframework.stereotype.Component;

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
