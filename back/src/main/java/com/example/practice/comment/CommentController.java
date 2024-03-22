package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.content.ContentMapper;
import com.example.practice.content.ContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/comments")
@Validated
public class CommentController {

    private final CommentMapper commentMapper;
    private final CommentService commentService;

    public CommentController(CommentMapper commentMapper,
                             CommentService commentService){
        this.commentMapper = commentMapper;
        this.commentService = commentService;
    }
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto,
                                      Authentication authentication){
        Comment comment = commentService.createComment(authentication, commentPostDto);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }
}
