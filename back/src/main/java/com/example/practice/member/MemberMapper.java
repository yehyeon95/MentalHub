package com.example.practice.member;

import com.example.practice.member.memberDto.MemberPostDto;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto){
        return new Member(
                memberPostDto.getEmail(),
                memberPostDto.getNickname(),
                memberPostDto.getPassword());
    }
}
