package com.example.practice.content.ContentDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ContentPostDto {


    private String title;

    private String body;

    private String font;

    private long fontSize;

    private String type;
}
