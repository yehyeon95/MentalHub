package com.example.practice.member.memberDto.duplicate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class MemberNickname {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9가-힣]{2,12})$",
            message = "올바른 닉네임 형식이 아닙니다.(영한문, 숫자 2~12)")
    private String nickname;
}
