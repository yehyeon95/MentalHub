package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentMapper;
import com.example.practice.comment.CommentService;
import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.reply.dto.ReplyPostDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/replies")
@Validated
public class ReplyController {
    private final ReplyMapper replyMapper;
    private final ReplyService replyService;

    public ReplyController(ReplyMapper replyMapper,
                           ReplyService replyService){
        this.replyMapper = replyMapper;
        this.replyService = replyService;
    }
    @PostMapping
    public ResponseEntity postReply(@Valid @RequestBody ReplyPostDto replyPostDto,
                                    Authentication authentication){
        Reply reply = replyService.createReply(authentication, replyPostDto);
        return new ResponseEntity<>(reply, HttpStatus.OK);
    }

    @PatchMapping("/{replyId}")
    public ResponseEntity patchReply(@PathVariable("replyId") long replyId,
                                       @Valid @RequestBody ReplyPostDto replyPostDto,
                                       Authentication authentication){
        Reply reply = replyService.updateReply(replyPostDto, replyId, authentication);
        return new ResponseEntity<>(reply, HttpStatus.OK);
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity deleteReply(@PathVariable("replyId") long replyId,
                                      Authentication authentication){
        Reply reply = replyService.deleteReply(replyId, authentication);
        return new ResponseEntity<>(reply, HttpStatus.NO_CONTENT);

    }



}
