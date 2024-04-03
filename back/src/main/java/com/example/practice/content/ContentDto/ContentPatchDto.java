package com.example.practice.content.ContentDto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ContentPatchDto {
    private String title;
    private String body;
    private String font;
    private long fontSize;
    private String type;

}
