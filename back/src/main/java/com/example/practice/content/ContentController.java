package com.example.practice.content;

import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.member.Member;
import com.example.practice.member.memberDto.MemberPostDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/contents")
@Validated
public class ContentController {

    private final ContentMapper contentMapper;
    private final ContentService contentService;
    private final ContentRepository contentRepository;

    public ContentController(ContentMapper contentMapper,
                             ContentService contentService,
                             ContentRepository contentRepository){
        this.contentMapper = contentMapper;
        this.contentService = contentService;
        this.contentRepository = contentRepository;
    }
    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentPostDto contentPostDto,
                                      Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Content content = contentService.createContent(memberId, contentPostDto);

        return new ResponseEntity<>(content, HttpStatus.OK);
    }
}
