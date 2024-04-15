package com.example.practice.content.ContentDto.response;

import com.example.practice.comment.commentDto.CommentResponseDtoNotUser;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContentGetResponseNotUser {
    ContentResponseDto contentResponseDto;
    List<CommentResponseDtoNotUser> commentsList;

    public ContentGetResponseNotUser(ContentResponseDto contentResponseDto, List<CommentResponseDtoNotUser> commentsList){
        this.contentResponseDto = contentResponseDto;
        this.commentsList = commentsList;
    }
}
