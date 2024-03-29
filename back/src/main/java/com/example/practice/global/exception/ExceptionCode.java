package com.example.practice.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "해당 회원이 존재하지 않음"),
    PASSWORD_NOT_CORRECT(404,"패스워드가 일치하지 않습니다"),
    MEMBER_NOT_ADMIN(404, "관리자 권한이 아닙니다"),
    MEMBER_NOT_WRITER(404, "게시글의 작성자가 아닙니다"),
    CONTENT_NOT_FOUND(404,"존재하지 않는 게시글입니다"),
    COMMENT_NOT_FOUND(404, "존재하지 않는 댓글입니다");


    @Getter
    private int status;

    @Getter String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }


}
