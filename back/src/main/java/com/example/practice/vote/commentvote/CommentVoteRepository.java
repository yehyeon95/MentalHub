package com.example.practice.vote.commentvote;

import com.example.practice.comment.Comment;
import com.example.practice.content.Content;
import com.example.practice.member.Member;
import com.example.practice.vote.contentvote.ContentVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentVoteRepository extends JpaRepository<CommentVote, Long> {
    Optional<CommentVote> findByMemberAndComment(Member member, Comment comment);
    Boolean existsByMemberAndComment(Member member, Comment comment);
}
