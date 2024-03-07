package com.example.practice.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "해당 회원이 존재하지 않음");
    @Getter
    private int status;

    @Getter String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }


}
