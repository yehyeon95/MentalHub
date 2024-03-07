package com.example.practice.member;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long memberId;

    @Column(length = 50, nullable = false, updatable = false, unique = true, name = "email")
    private String email;

    @Column(length = 10, nullable = false, unique = true, updatable = true, name = "nickname")
    private String nickname;

    @Column(nullable = false, updatable = true, unique = false, name = "password")
    private String password;

    private String role;

    public Member(String email, String nickname, String password){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
}
