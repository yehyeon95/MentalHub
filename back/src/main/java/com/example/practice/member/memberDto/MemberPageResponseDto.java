package com.example.practice.member.memberDto;

import com.example.practice.global.dto.PageInfo;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberPageResponseDto {
    private List<MemberResponseDto> data;
    private PageInfo pageInfo;

    public MemberPageResponseDto(List<MemberResponseDto> data, PageInfo pageInfo){
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
