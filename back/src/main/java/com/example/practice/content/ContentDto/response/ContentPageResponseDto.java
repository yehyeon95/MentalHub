package com.example.practice.content.ContentDto.response;

import com.example.practice.global.dto.PageInfo;
import lombok.Getter;

import java.util.List;

@Getter
public class ContentPageResponseDto {
    private List<ContentResponseDto> data;
    private PageInfo pageInfo;

    public ContentPageResponseDto(List<ContentResponseDto> data, PageInfo pageInfo){
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
