package com.example.practice.content;

import com.example.practice.content.ContentDto.ContentPatchDto;
import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.member.Member;
import com.example.practice.member.memberDto.MemberPostDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/contents")
@Validated
public class ContentController {

    private final ContentMapper contentMapper;
    private final ContentService contentService;


    public ContentController(ContentMapper contentMapper,
                             ContentService contentService){
        this.contentMapper = contentMapper;
        this.contentService = contentService;
    }
    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentPostDto contentPostDto,
                                      Authentication authentication){

        Content content = contentService.createContent(authentication, contentPostDto);
        ContentResponseDto response = contentMapper.ContentToContentResponseDto(content, content.getMember().getMemberId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@PathVariable("contentId") long contentId,
                                       @Valid @RequestBody ContentPatchDto contentPatchDto){
        Content content = contentService.updateContent(contentId, contentPatchDto);
        ContentResponseDto response = contentMapper.ContentToContentResponseDto(content, content.getMember().getMemberId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity getContent(@PathVariable("contentId") long contentId){
        ContentResponseDto response = contentService.getContent(contentId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllContents(@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size){
        long response = 0;


        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") long contentId,
                                        Authentication authentication){
        long memberId = contentService.extractMemberId(authentication);
        contentService.deleteContent(contentId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
