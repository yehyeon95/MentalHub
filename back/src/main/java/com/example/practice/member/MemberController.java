package com.example.practice.member;

import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.memberDto.MemberDeletePassword;
import com.example.practice.member.memberDto.MemberPatchDto;
import com.example.practice.member.memberDto.MemberPostDto;
import com.example.practice.member.memberDto.MemberResponseDto;
import com.example.practice.member.memberDto.duplicate.MemberEmail;
import com.example.practice.member.memberDto.duplicate.MemberNickname;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/members")
@Validated
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

    @PatchMapping
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto,
                                      Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Member response = memberService.updateMember(memberPatchDto, 1);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //관리자 페이지에서 관리자 관한을 요청한 회원의 권한을 변경.
    @PatchMapping
    public ResponseEntity patchMemberRole(@Valid @RequestParam long memberId,
                                          Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long adminId = ((Number) principal.get("memberId")).longValue();

        boolean checkAdminRole = memberService.checkRole(adminId);

        if(checkAdminRole==false){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ADMIN);
        }
        else{
            Member member = memberService.changeRole(memberId);
            MemberResponseDto result = memberMapper.MemberToMemberResponseDto(member);
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
    @GetMapping
    public ResponseEntity getMember(Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        MemberResponseDto response = memberService.getMember(memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //관리자 페이지에서 회원 목록 10개씩 최신순으로 불러오기.
    @GetMapping
    public ResponseEntity getAllMembers(@RequestParam int page,
                                        @RequestParam int size,
                                        Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        boolean checkRole = memberService.checkRole(memberId);

        if(checkRole==false){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ADMIN);
        }
        else{
            PageRequest pageable = PageRequest.of(page, size);

            return new ResponseEntity<>(memberRepository.findNormalMembersWithoutPassword(pageable), HttpStatus.OK);
        }
    }

    //회원 삭제
    @DeleteMapping
    public ResponseEntity deleteMember(@Valid @RequestBody MemberDeletePassword memberPassword,
                                       Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        boolean passwordCorrect = memberService.checkPassword(memberId, memberPassword.getPassword());

        if(passwordCorrect==true){
            memberService.deleteMember(memberId);
        }
        else throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_CORRECT);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
