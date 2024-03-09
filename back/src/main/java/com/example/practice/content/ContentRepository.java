package com.example.practice.content;

import com.example.practice.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

}
