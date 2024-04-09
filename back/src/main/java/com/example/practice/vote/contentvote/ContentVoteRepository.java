package com.example.practice.vote.contentvote;

import com.example.practice.content.Content;
import com.example.practice.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentVoteRepository extends JpaRepository<ContentVote, Long> {
    Optional<ContentVote> findByMemberAndContent(Member member, Content content);
    long countAllByContent(Content content);
    Boolean existsByMemberAndContent(Member member, Content content);

}
