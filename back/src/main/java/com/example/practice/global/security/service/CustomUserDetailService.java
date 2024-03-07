package com.example.practice.global.security.service;

import com.example.practice.global.security.dto.CustomUserDetails;
import com.example.practice.member.Member;
import com.example.practice.member.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    public CustomUserDetailService(MemberRepository memberRepository){
        this.memberRepository=memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //데이터베이스에서 유저정보 불러오기
        Member member = memberRepository.findByEmail(username).get();

        //일치하는 유저정보가 존재하면 Userdetails에 담아서 authenticationManager에게 검증요청
        if(member != null){
            return new CustomUserDetails(member);
        }

        return null;
    }
}
