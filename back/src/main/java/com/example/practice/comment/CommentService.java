package com.example.practice.comment;

import com.example.practice.comment.commentDto.CommentPostDto;
import com.example.practice.content.Content;
import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.content.ContentService;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentService {
    private final EntityManager em;
    private final MemberService memberService;
    private final ContentService contentService;
    private final CommentRepository commentRepository;

    public CommentService(EntityManager em,
                          MemberService memberService,
                          ContentService contentService,
                          CommentRepository commentRepository){
        this.em = em;
        this.memberService = memberService;
        this.contentService = contentService;
        this.commentRepository = commentRepository;
    }

    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }

    public Comment createComment(Authentication authentication, CommentPostDto commentPostDto){
        Comment comment = new Comment();

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        Content content = contentService.findVerifiedContent(commentPostDto.getContentId());

        comment.setCommentBody(commentPostDto.getCommentBody());
        comment.setMember(member);
        comment.setContent(content);

        Comment savedComment = commentRepository.save(comment);

        return savedComment;
    }
}
