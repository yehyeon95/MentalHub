package com.example.practice.global.enumclass;

import lombok.Getter;

@Getter
public enum Type {
    INFO("INFO"),
    POST("POST"),
    NOTICE("NOTICE");
    private final String message;
    Type(String message) {
        this.message = message;
    }
}
