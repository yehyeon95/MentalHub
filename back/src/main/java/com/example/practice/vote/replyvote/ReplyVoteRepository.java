package com.example.practice.vote.replyvote;

import com.example.practice.comment.Comment;
import com.example.practice.content.Content;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.example.practice.vote.commentvote.CommentVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReplyVoteRepository extends JpaRepository<ReplyVote, Long> {
    Optional<ReplyVote> findByMemberAndReply(Member member, Reply reply);
    long countAllByReply(Reply reply);
    Boolean existsByMemberAndReply(Member member, Reply reply);
}
