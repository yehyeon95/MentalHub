package com.example.practice.vote;

import com.example.practice.member.memberDto.duplicate.MemberNickname;
import com.example.practice.vote.commentvote.CommentVoteDto;
import com.example.practice.vote.commentvote.CommentVoteResponseDto;
import com.example.practice.vote.contentvote.ContentVoteDto;
import com.example.practice.vote.contentvote.ContentVoteResponseDto;
import com.example.practice.vote.replyvote.ReplyVoteDto;
import com.example.practice.vote.replyvote.ReplyVoteResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/votes")
@Validated
public class VoteController {
    private final VoteService voteService;

    public VoteController(VoteService voteService){
        this.voteService = voteService;
    }

    @PostMapping("/contents")
    public ResponseEntity postContentVote(@Valid @RequestBody ContentVoteDto contentVoteDto,
                                          Authentication authentication){
        ContentVoteResponseDto response = voteService.CreateContentVote(authentication, contentVoteDto.getContentId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/contents")
    public ResponseEntity deleteContentVote(@Valid @RequestBody ContentVoteDto contentVoteDto,
                                            Authentication authentication){
        voteService.deleteContentVote(authentication, contentVoteDto.getContentId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/comments")
    public ResponseEntity postCommentVote(@Valid @RequestBody CommentVoteDto commentVoteDto,
                                          Authentication authentication){
        CommentVoteResponseDto response = voteService.CreateCommentVote(authentication, commentVoteDto.getCommentId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/comments")
    public ResponseEntity deleteCommentVote(@Valid @RequestBody CommentVoteDto commentVoteDto,
                                            Authentication authentication){
        voteService.deleteCommentVote(authentication, commentVoteDto.getCommentId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/replies")
    public ResponseEntity postReplyVote(@Valid @RequestBody ReplyVoteDto replyVoteDto,
                                        Authentication authentication){
        ReplyVoteResponseDto response = voteService.CreateReplyVote(authentication, replyVoteDto.getReplyId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/replies")
    public ResponseEntity deleteReplyVote(@Valid @RequestBody ReplyVoteDto replyVoteDto,
                                            Authentication authentication){
        voteService.deleteReplyVote(authentication, replyVoteDto.getReplyId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
