package com.example.practice.member;

import com.example.practice.content.Content;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(length = 50, nullable = true, updatable = false, unique = true, name = "email")
    private String email;

    @Column(length = 10, nullable = true, unique = true, updatable = true, name = "nickname")
    private String nickname;

    @Column(nullable = true, updatable = true, unique = false, name = "password")
    private String password;

    @CreatedDate
    @Column(updatable = true, unique = false, name = "created_at")
    private LocalDateTime created_at;

    @Column(nullable = true, updatable = true, unique = false, name = "role")
    private String role;

    @OneToMany(mappedBy = "member")
    private List<Content> contents;

    public Member(String email, String nickname, String password){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
    public Member(Long memberId, String email, String nickname, String role){
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.role = role;
    }
}
