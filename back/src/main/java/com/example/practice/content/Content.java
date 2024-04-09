package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.example.practice.vote.contentvote.ContentVote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "CONTENT")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id",nullable = false, updatable = false, unique = true)
    private long contentId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 50, nullable = false, updatable = true, unique = true, name = "title")
    private String title;

    @Column(length = 1000, nullable = true, updatable = true, unique = false, name = "font")
    private String font;

    @Column(length = 50000, nullable = false, updatable = true, unique = false, name = "body")
    private String body;

    @Column(nullable = true, updatable = true, unique = false, name = "font_size")
    private long fontSize;

    @CreatedDate
    @Column(nullable = true, updatable = false, unique = false, name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = true, updatable = true, unique = false, name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(nullable = true, updatable = true, unique = false, name = "views")
    private long views;

    @Column(nullable = false, updatable = true, unique = false, name = "type")
    private String type;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Reply> replies;

    @Column(updatable = true, unique = false, name = "modified")
    private boolean Modified;
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<ContentVote> ContentVotes;

    public Content(String title, String body){
        this.title = title;
        this.body = body;
    }
}
