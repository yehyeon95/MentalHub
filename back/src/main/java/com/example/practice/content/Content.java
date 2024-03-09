package com.example.practice.content;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "CONTENT")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private long contentId;

    @Column(name = "member_id")
    private long memberId;

    @Column(length = 50, nullable = false, updatable = true, unique = false, name = "title")
    private String title;

    @Column(length = 1000, nullable = true, updatable = true, unique = false, name = "font")
    private String font;

    @Column(length = 10000, nullable = false, updatable = true, unique = false, name = "body")
    private String body;

    @Column(nullable = true, updatable = true, unique = false, name = "font_size")
    private long fontSize;

    @Column(length = 200, nullable = true, updatable = true, unique = false, name = "image_link")
    private String imageLink;

    @CreatedDate
    @Column(nullable = false, updatable = false, unique = false, name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, updatable = true, unique = false, name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(nullable = true, updatable = true, unique = false, name = "views")
    private long views;

    @Column(nullable = false, updatable = true, unique = false, name = "type")
    private String type;

    public Content(String title, String body){
        this.title = title;
        this.body = body;
    }
}
