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

    public ContentResponseDto ContentToContentResponseDto(Content content, long memberId, String nickname, long commentsCount){
        return new ContentResponseDto(
                content.getContentId(),
                memberId,
                nickname,
                content.getTitle(),
                content.getBody(),
                content.getFont(),
                content.getFontSize(),
                content.getImageLink(),
                content.getCreatedAt(),
                content.getModifiedAt(),
                content.getViews(),
                content.getType(),
                commentsCount,
                content.isModified()
        );
    }
}
