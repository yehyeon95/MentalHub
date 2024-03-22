package com.example.practice.comment;

import com.example.practice.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    long countAllByContent(Content content);
    List<Comment> findAllByContent(Content content);
}
