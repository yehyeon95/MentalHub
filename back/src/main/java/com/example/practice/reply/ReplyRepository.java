package com.example.practice.reply;

import com.example.practice.comment.Comment;
import com.example.practice.content.Content;
import com.example.practice.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findAllByComment(Comment comment);
    List<Reply> findAllByMember(Member member);
    long countAllByContent(Content content);
    long countAllByMember(Member member);
}
