package com.example.practice.comment;

import com.example.practice.content.Content;
import com.example.practice.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    long countAllByContent(Content content);
    List<Comment> findAllByContent(Content content);
    Optional<Comment> findByCommentId(long commentId);
}
