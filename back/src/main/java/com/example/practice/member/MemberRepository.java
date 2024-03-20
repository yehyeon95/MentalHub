package com.example.practice.member;

import com.example.practice.member.memberDto.MemberInterface;
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
    /*
    @Query("SELECT new Member(m.id, m.email, m.nickname, m.role, m.createdAt) FROM Member m WHERE m.role = 'normal' ORDER BY m.createdAt DESC")
    Page<Member> findNormalMembersWithoutPassword(Pageable pageable);*/

    /*@Query("SELECT m.id, m.email, m.nickname, m.role, m.createdAt FROM Member m WHERE m.role = 'normal' ORDER BY m.createdAt DESC")
    Page<Member> findNormalMembersWithoutPassword(Pageable pageable);*/

    @Query("SELECT m.id  FROM Member m WHERE m.role = 'ADMIN' ORDER BY m.created_at DESC")
    List<MemberInterface> findAllWithout();

}
