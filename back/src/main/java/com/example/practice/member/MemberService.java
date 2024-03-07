package com.example.practice.member;

import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.memberDto.MemberPatchDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EntityManager em;
    public MemberService(MemberRepository memberRepository,
                         BCryptPasswordEncoder bCryptPasswordEncoder,
                         EntityManager em){
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.em = em;
    }

    public Member createMember(Member member){
        verifyEmail(member.getEmail());
        checkEmail(member.getEmail());

        Member member1 = new Member();
        member1.setEmail(member.getEmail());
        member1.setNickname(member.getNickname());
        member1.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member1.setRole("ADMIN");

        Member savedMember = memberRepository.save(member1);

        return savedMember;
    }

    public Member updateMember(MemberPatchDto memberPatchDto, long memberId){
        Member member = em.find(Member.class, memberId);

        member.setEmail(memberPatchDto.getEmail());
        member.setNickname(memberPatchDto.getNickname());
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));

        return memberRepository.save(member);
    }

    private void verifyEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    private void checkEmail(String email){
        Boolean isExist = memberRepository.existsByEmail(email);
        if(isExist)
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public boolean duplicateEmail(String email){
        boolean result = false;
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            result = true;}
        return result;
    }
    public boolean duplicateNickname(String nickname){
        boolean result = false;
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent()){
            result = true;}
        return result;
    }


}
