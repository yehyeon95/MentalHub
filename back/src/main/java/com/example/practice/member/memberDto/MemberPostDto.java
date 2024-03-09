package com.example.practice.member.memberDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
public class MemberPostDto {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9@.]{8,50})$")
    //정규식
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9가-힣]{2,12})$",
            message = "올바른 닉네임 형식이 아닙니다.(영한문, 숫자 2~12)")
    private String nickname;

    @NotBlank
    private String password;

}
