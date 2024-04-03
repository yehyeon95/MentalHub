package com.example.practice.comment;

import com.example.practice.content.Content;
import com.example.practice.member.Member;
import com.example.practice.reply.Reply;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "COMMENT")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private long commentId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<Reply> replies;

    @Column(length = 500, nullable = false, updatable = true, unique = false, name = "comment_body")
    private String commentBody;

    @CreatedDate
    @Column(updatable = true, unique = false, name = "created_at")
    private LocalDateTime created_at;

    private long votes;
    @Column(updatable = true, unique = false, name = "deleted")
    private boolean deleted;

    public Comment(String commentBody){
        this.commentBody = commentBody;
    }


}
