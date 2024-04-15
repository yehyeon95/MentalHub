package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.comment.commentDto.MyComments;
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
    private final CommentRepository commentRepository;

    public CommentController(CommentMapper commentMapper,
                             CommentService commentService,
                             CommentRepository commentRepository){
        this.commentMapper = commentMapper;
        this.commentService = commentService;
        this.commentRepository = commentRepository;
    }
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto,
                                      Authentication authentication){
        Comment comment = commentService.createComment(authentication, commentPostDto);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") long commentId,
                                       @Valid @RequestBody CommentPostDto commentPostDto,
                                       Authentication authentication){
        Comment comment = commentService.updateComment(commentPostDto, commentId, authentication);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @GetMapping("/mycomments")
    public ResponseEntity getMemberComment(Authentication authentication){

        MyComments myComments = commentService.getMyComments(authentication);
        return new ResponseEntity<>(myComments, HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") long commentId,
                                        Authentication authentication){
        Comment comment = commentService.deleteComment(commentId, authentication);
        return new ResponseEntity<>(comment, HttpStatus.NO_CONTENT);
    }
}
