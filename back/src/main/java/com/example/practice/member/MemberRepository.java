package com.example.practice.member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    //제네릭
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByMemberId(long memberId);

    //유저가 존재하는지 확인
    Boolean existsByEmail(String email);

    @Query("SELECT new Member(m.id, m.email, m.nickname, m.role, m.createdAt) FROM Member m WHERE m.role = 'normal' ORDER BY m.createdAt DESC")
    Page<Member> findNormalMembersWithoutPassword(Pageable pageable);

}
