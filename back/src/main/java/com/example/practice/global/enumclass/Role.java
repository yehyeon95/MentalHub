package com.example.practice.global.enumclass;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("ADMIN"),
    USER("USER");

    private final String message;

    Role(String message) {
        this.message = message;
    }
}
