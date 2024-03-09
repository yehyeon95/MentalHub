package com.example.practice.content.ContentDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ContentPostDto {

    @NotBlank
    private String title;
    @NotBlank
    private String body;
    @NotBlank
    private String font;
    @NotBlank
    private long fontSize;
    @NotBlank
    private String type;
}
