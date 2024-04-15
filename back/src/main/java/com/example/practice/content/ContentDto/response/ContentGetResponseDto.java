package com.example.practice.content.ContentDto.response;

import com.example.practice.comment.commentDto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContentGetResponseDto {
    ContentResponseDto contentResponseDto;
    List<CommentResponseDto> commentsList;

    public ContentGetResponseDto(ContentResponseDto contentResponseDto, List<CommentResponseDto> commentsList){
        this.contentResponseDto = contentResponseDto;
        this.commentsList = commentsList;
    }
}
