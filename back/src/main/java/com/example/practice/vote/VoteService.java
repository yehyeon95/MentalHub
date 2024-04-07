package com.example.practice.vote;


import com.example.practice.content.Content;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.vote.contentvote.ContentVote;
import com.example.practice.vote.contentvote.ContentVoteMapper;
import com.example.practice.vote.contentvote.ContentVoteRepository;
import com.example.practice.vote.contentvote.ContentVoteResponseDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class VoteService {
    private final ContentVoteRepository contentVoteRepository;
    private final ContentVoteMapper contentVoteMapper;
    private final EntityManager em;

    public VoteService(ContentVoteRepository contentVoteRepository,
                       ContentVoteMapper contentVoteMapper,
                       EntityManager em){
        this.contentVoteRepository = contentVoteRepository;
        this.contentVoteMapper = contentVoteMapper;
        this.em = em;
    }

    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }

    public ContentVoteResponseDto CreateContentVote(Authentication authentication, long contentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Content content = em.find(Content.class, contentId);

        boolean isExist = contentVoteRepository.existsByMemberAndContent(member, content);
        if(isExist){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        else{
        ContentVote contentVote = new ContentVote();

        contentVote.setMember(member);
        contentVote.setContent(content);

        ContentVote savedVote = contentVoteRepository.save(contentVote);
        return contentVoteMapper.contentVoteToResponse(savedVote);
        }
    }
    public ContentVote findVerifiedContentVote(Member member, Content content) {
        Optional<ContentVote> optionalContentVote =
                contentVoteRepository.findByMemberAndContent(member, content);
        ContentVote findContentVote =
                optionalContentVote.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));
        return findContentVote;
    }

    public void deleteContentVote(Authentication authentication, long contentId){
        long memberId = extractMemberId(authentication);

        Member member = em.find(Member.class, memberId);

        Content content = em.find(Content.class, contentId);

        ContentVote contentVote = findVerifiedContentVote(member, content);
        contentVoteRepository.delete(contentVote);
    }





}
