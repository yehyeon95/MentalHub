package com.example.practice.content.ContentDto;

import com.example.practice.comment.Comment;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.global.dto.PageInfo;
import lombok.AllArgsConstructor;
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
