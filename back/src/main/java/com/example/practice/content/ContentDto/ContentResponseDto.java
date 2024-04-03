package com.example.practice.content.ContentDto;

import com.example.practice.comment.Comment;
import com.example.practice.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContentResponseDto {
    private long contentId;
    private long memberId;
    private String nickname;
    private String title;
    private String body;
    private String font;
    private long fontSize;
    private String imageLink;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private long views;
    private String type;
    private long commentsCount;
    private boolean Modified;
}
