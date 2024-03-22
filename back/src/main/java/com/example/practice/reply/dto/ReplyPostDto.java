package com.example.practice.reply.dto;

import lombok.Getter;

@Getter
public class ReplyPostDto {
    private String replyBody;
    private long contentId;
    private long commentId;

}
