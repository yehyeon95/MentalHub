package com.example.practice.member;

import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.memberDto.*;
import com.example.practice.member.memberDto.duplicate.MemberEmail;
import com.example.practice.member.memberDto.duplicate.MemberNickname;
import com.example.practice.member.memberDto.duplicate.MemberPassword;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    //의존성 주입
    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final MemberMapper memberMapper;

    public MemberController(MemberRepository memberRepository,
                            MemberService memberService,
                            MemberMapper memberMapper){
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member response = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/nickname")
    public ResponseEntity patchMemberNickname(@Valid @RequestBody MemberNickname memberNickname,
                                      Authentication authentication){

        long memberId = memberService.extractMemberId(authentication);

        Member response = memberService.updateMemberNickname(memberNickname, memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity patchMemberPassword(@Valid @RequestBody MemberPassword memberPassword,
                                      Authentication authentication){

        long memberId = memberService.extractMemberId(authentication);

        Member response = memberService.updateMemberPassword(memberPassword, memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //관리자 페이지에서 관리자 관한을 요청한 회원의 권한을 변경.
    @PatchMapping("/role")
    public ResponseEntity patchMemberRole(@Valid @RequestParam long memberId,
                                          Authentication authentication){
        long adminId = memberService.extractMemberId(authentication);

        boolean checkAdminRole = memberService.checkRole(adminId);

        if(checkAdminRole==false){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ADMIN);
        }
        else{
            Member member = memberService.changeRole(memberId);
            MemberResponseDto result = memberMapper.memberToMemberResponseDto(member);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    //중복검사
    @PostMapping("/duplicate/email")
    public ResponseEntity duplicateEmail(@Valid @RequestBody MemberEmail memberEmail){
        String email = memberEmail.getEmail();
        boolean result = memberService.duplicateEmail(email);
        return new ResponseEntity<>(result,
                HttpStatus.OK);
    }
    @PostMapping("/duplicate/nickname")
    public ResponseEntity duplicateNickname(@Valid @RequestBody MemberNickname memberNickname){
        String nickname = memberNickname.getNickname();
        boolean result = memberService.duplicateNickname(nickname);
        return new ResponseEntity<>(result,
                HttpStatus.OK);
    }

    //회원정보 불러오기.
    @GetMapping("/somemember")
    public ResponseEntity getMember(Authentication authentication){

        long memberId = memberService.extractMemberId(authentication);

        System.out.println(memberId+"mmmmmmmmmmmmmmmmm");

        MemberResponseDto response = memberService.getMember(memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //관리자 페이지에서 회원 목록 10개씩 최신순으로 불러오기.

    /*@GetMapping
    public ResponseEntity getAllMembers(@RequestParam int page,
                                        @RequestParam int size,
                                        Authentication authentication){
        long memberId = memberService.extractMemberId(authentication);

        boolean checkRole = memberService.checkRole(memberId);

        if(checkRole==false){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ADMIN);
        }
        else{
            PageRequest pageable = PageRequest.of(page, size);
            //memberRepository.findNormalMembersWithoutPassword(pageable)

            return new ResponseEntity<>(HttpStatus.OK);
        }
    }*/

    @GetMapping
    public ResponseEntity getAllMembers2(){
        List<MemberInterface> response = memberService.getAllMembers();
        log.info("response length = {}" , response.size());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //회원 삭제
    @DeleteMapping
    public ResponseEntity deleteMember(@Valid @RequestBody MemberPassword memberPassword,
                                       Authentication authentication){
        long memberId = memberService.extractMemberId(authentication);

        boolean passwordCorrect = memberService.checkPassword(memberId, memberPassword);

        if(passwordCorrect==true){
            memberService.deleteMember(memberId);
        }
        else throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_CORRECT);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/checkpassword")
    public ResponseEntity verifyPassword(@Valid @RequestBody MemberPassword memberPassword,
                                         Authentication authentication){
        long memberId = memberService.extractMemberId(authentication);
        boolean passwordCorrect = memberService.checkPassword(memberId, memberPassword);

        return new ResponseEntity(passwordCorrect, HttpStatus.OK);
    }



}
