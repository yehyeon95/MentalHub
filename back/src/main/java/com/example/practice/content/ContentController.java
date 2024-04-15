package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentMapper;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.comment.commentDto.CommentResponseDtoNotUser;
import com.example.practice.content.ContentDto.*;
import com.example.practice.content.ContentDto.response.ContentGetResponseDto;
import com.example.practice.content.ContentDto.response.ContentGetResponseNotUser;
import com.example.practice.content.ContentDto.response.ContentPageResponseDto;
import com.example.practice.content.ContentDto.response.ContentResponseDto;
import com.example.practice.global.dto.PageInfo;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.reply.ReplyRepository;
import com.example.practice.vote.VoteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/contents")
@Validated
@RequiredArgsConstructor
public class ContentController {

    private final ContentMapper contentMapper;
    private final ContentService contentService;
    private final CommentMapper commentMapper;
    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final VoteService voteService;


    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentPostDto contentPostDto,
                                      Authentication authentication){

        Content content = contentService.createContent(authentication, contentPostDto);
        ContentResponseDto response = contentMapper.ContentToContentResponseDto(content,0,0,false);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@PathVariable("contentId") long contentId,
                                       @Valid @RequestBody ContentPatchDto contentPatchDto,
                                       Authentication authentication){
        ContentResponseDto response = contentService.updateContent(contentId, contentPatchDto,authentication);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity getContent(@PathVariable("contentId") long contentId){
        ContentResponseDto response = contentService.getContent(contentId);

        List<Comment> findComments = contentService.findVerifyComments(contentId);

        List<CommentResponseDtoNotUser> findCommentsList =
                findComments.stream()
                        .map(comment-> commentMapper.CommentToCommentResponseDtoNotUser(comment,replyRepository.findAllByComment(comment), voteService.countCommentVotes(comment)))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ContentGetResponseNotUser(response, findCommentsList), HttpStatus.OK);
    }
    @GetMapping("/{contentId}/login")
    public ResponseEntity getContentLogin(@PathVariable("contentId") long contentId,
                                          Authentication authentication){
        ContentResponseDto response = contentService.getContentLogin(contentId,authentication);

        List<Comment> findComments = contentService.findVerifyComments(contentId);

        long memberId = contentService.extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);


        List<CommentResponseDto> result =
                findComments.stream()
                        .map(comment-> commentMapper.CommentToCommentResponseDto(comment,replyRepository.findAllByComment(comment),
                                voteService.countCommentVotes(comment), voteService.checkMemberCommentVoted(member, comment),member))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ContentGetResponseDto(response, result), HttpStatus.OK);
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
                        .map(content-> contentMapper.ContentToContentResponseDto(content,contentService.getCommentsCount(content.getContentId()),
                                contentService.getContentVotesCount(content.getContentId()),false))
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
    @GetMapping("/search")
    public ResponseEntity searchContent(@RequestParam("keyword") String keyword,
                                        @RequestParam("searchType") String searchType,
                                        @RequestParam("memberId") long memberId){
        List<ContentResponseDto> response = contentService.searchContents(keyword,searchType,memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
