package com.example.practice.content.ContentDto.response;

import com.example.practice.content.Content;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class MyContents {
    List<Content> myContents;
    long contentsCnt;
}
