package com.example.practice.content.ContentDto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ContentPatchDto {
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
