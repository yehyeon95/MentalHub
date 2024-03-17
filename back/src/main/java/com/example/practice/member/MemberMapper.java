package com.example.practice.member;

import com.example.practice.member.memberDto.MemberPostDto;
import com.example.practice.member.memberDto.MemberResponseDto;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto){
        return new Member(
                memberPostDto.getEmail(),
                memberPostDto.getNickname(),
                memberPostDto.getPassword());
    }
    public MemberResponseDto memberToMemberResponseDto(Member member){
        return new MemberResponseDto(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getRole());
    }

}
