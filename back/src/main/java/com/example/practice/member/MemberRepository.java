package com.example.practice.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    //제네릭
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    //유저가 존재하는지 확인
    Boolean existsByEmail(String email);

}
