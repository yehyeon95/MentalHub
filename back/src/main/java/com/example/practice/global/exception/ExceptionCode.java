package com.example.practice.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "해당 회원이 존재하지 않음"),
    MEMBER_ALREADY_EXIST(404, "이미 존재하는 회원입니다"),
    PASSWORD_NOT_CORRECT(404,"패스워드가 일치하지 않습니다"),
    MEMBER_NOT_ADMIN(404, "관리자 권한이 아닙니다"),
    MEMBER_NOT_WRITER(404, "글의 작성자가 아닙니다"),
    CONTENT_NOT_FOUND(404,"존재하지 않는 게시글입니다"),
    COMMENT_NOT_FOUND(404, "존재하지 않는 댓글입니다"),
    ALREADY_VOTED(404, "이미 추천한 컨텐츠입니다"),
    VOTE_NOT_FOUND(404, "추천한 컨텐츠가 아닙니다");


    @Getter
    private int status;

    @Getter String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }


}
