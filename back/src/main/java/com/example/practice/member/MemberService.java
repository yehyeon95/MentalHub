package com.example.practice.member;

import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.memberDto.MemberInterface;
import com.example.practice.member.memberDto.MemberPatchDto;
import com.example.practice.member.memberDto.MemberResponseDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberMapper memberMapper;
    private final EntityManager em;
    public MemberService(MemberRepository memberRepository,
                         BCryptPasswordEncoder bCryptPasswordEncoder,
                         EntityManager em,
                         MemberMapper memberMapper){
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.em = em;
        this.memberMapper = memberMapper;
    }

    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
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

    public MemberResponseDto getMember(long memberId){
        Optional<Member> member = memberRepository.findByMemberId(memberId);
        Member member1 = member.get();

        MemberResponseDto result = memberMapper.memberToMemberResponseDto(member1);

        return result;
    }
    public List<MemberInterface> getAllMembers(){
        List<MemberInterface> members = memberRepository.findAllWithout();

        return members;
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findByMemberId(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
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

    public boolean checkPassword(long memberId, String password){
        Member member = findVerifiedMember(memberId);
        String findPassword = member.getPassword();

        boolean matches = bCryptPasswordEncoder.matches(password, findPassword);
        boolean result = false;

        if (matches == true){
            result = true;
        }

        else if(matches != true){
            result = false;
        }

        return result;
    }

    public boolean checkRole(long memberId){
        Member member = findVerifiedMember(memberId);
        String memberRole = member.getRole();

        boolean result;
        if(memberRole=="ADMIN"){
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }

    public Member changeRole(long memberId){
        Member member = em.find(Member.class, memberId);
        member.setRole("NORMAL");

        return memberRepository.save(member);
    }

}
