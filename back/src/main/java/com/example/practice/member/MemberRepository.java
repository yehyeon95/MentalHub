package com.example.practice.member;

import com.example.practice.content.Content;
import com.example.practice.member.memberDto.MemberInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    //제네릭
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByMemberId(long memberId);

    //유저가 존재하는지 확인
    Boolean existsByEmail(String email);

    Page<Member> findAllByRoleOrderByMemberIdDesc(String role, Pageable pageable);

    @Query("SELECT m.id  FROM Member m WHERE m.role = 'USER' ORDER BY m.created_at DESC")
    List<MemberInterface> findAllWithout();

}
