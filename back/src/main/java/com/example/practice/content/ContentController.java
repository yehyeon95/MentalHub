package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentMapper;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.content.ContentDto.*;
import com.example.practice.global.dto.PageInfo;
import com.example.practice.member.Member;
import com.example.practice.member.memberDto.MemberPostDto;
import com.example.practice.reply.ReplyRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/contents")
@Validated
public class ContentController {

    private final ContentMapper contentMapper;
    private final ContentService contentService;
    private final CommentMapper commentMapper;
    private final ReplyRepository replyRepository;


    public ContentController(ContentMapper contentMapper,
                             ContentService contentService,
                             ReplyRepository replyRepository,
                             CommentMapper commentMapper){
        this.contentMapper = contentMapper;
        this.contentService = contentService;
        this.replyRepository = replyRepository;
        this.commentMapper = commentMapper;
    }
    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentPostDto contentPostDto,
                                      Authentication authentication){

        Content content = contentService.createContent(authentication, contentPostDto);
        ContentResponseDto response = contentMapper.ContentToContentResponseDto(content, content.getMember().getMemberId(),0);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@PathVariable("contentId") long contentId,
                                       @Valid @RequestBody ContentPatchDto contentPatchDto){
        Content content = contentService.updateContent(contentId, contentPatchDto);
        ContentResponseDto response = contentMapper.ContentToContentResponseDto(content, content.getMember().getMemberId(),contentService.getCommentsCount(contentId));

        return new ResponseEntity<>(response, HttpStatus.OK);//
    }

    @GetMapping("/{contentId}")
    public ResponseEntity getContent(@PathVariable("contentId") long contentId){
        ContentResponseDto response = contentService.getContent(contentId);

        List<Comment> findComments = contentService.findVerifyComments(contentId);

        List<CommentResponseDto> findCommentsList =
                findComments.stream()
                        .map(comment-> commentMapper.CommentToCommentResponseDto(comment,replyRepository.findAllByComment(comment)))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ContentGetResponseDto(response, findCommentsList), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllContents(@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size,
                                         @RequestParam("type") String type){

        Page<Content> contentPage = contentService.findPageContent(type,page-1, size);
        PageInfo pageInfo = new PageInfo(page, size,(int)contentPage.getTotalElements(), contentPage.getTotalPages());

        List<Content> contents = contentPage.getContent();

        List<ContentResponseDto> response =
                contents.stream()
                        .map(content-> contentMapper.ContentToContentResponseDto(content,content.getMember().getMemberId(),contentService.getCommentsCount(content.getContentId())))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ContentPageResponseDto(response, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") long contentId,
                                        Authentication authentication){
        long memberId = contentService.extractMemberId(authentication);
        contentService.deleteContent(contentId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
