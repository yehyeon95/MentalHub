package com.example.practice.member;

import com.example.practice.member.memberDto.MemberPatchDto;
import com.example.practice.member.memberDto.MemberPostDto;
import com.example.practice.member.memberDto.duplicate.MemberEmail;
import com.example.practice.member.memberDto.duplicate.MemberNickname;
import jakarta.validation.Valid;
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
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto
                                      //Authentication authentication
                                      ){
       //Map<String, Object> principal = (Map) authentication.getPrincipal();//long memberId = ((Number) principal.get("memberId")).longValue();
        Member response = memberService.updateMember(memberPatchDto, 1);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

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


}
