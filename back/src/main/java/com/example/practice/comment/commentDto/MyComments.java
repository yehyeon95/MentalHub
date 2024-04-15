package com.example.practice.comment.commentDto;

import com.example.practice.comment.Comment;
import com.example.practice.reply.Reply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MyComments {
    List<Comment> myComments;
    List<Reply> myReplies;
    long commentsCnt;
}
