package com.example.practice.content;

import com.example.practice.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {

    Page<Content> findAllByTypeOrderByContentIdDesc(String type, Pageable pageable);
    List<Content> findAllByMember(Member member);
    long countAllByMember(Member member);

    Optional<Content> findByContentId(long contentId);

}
