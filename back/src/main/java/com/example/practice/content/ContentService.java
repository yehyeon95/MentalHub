package com.example.practice.content;

import com.example.practice.content.ContentDto.ContentPatchDto;
import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.member.memberDto.MemberResponseDto;
import jakarta.persistence.EntityManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ContentService {
    private final ContentMapper contentMapper;
    private final ContentRepository contentRepository;
    private final EntityManager em;
    private final MemberService memberService;

    public ContentService(ContentMapper contentMapper,
                          ContentRepository contentRepository,
                          EntityManager em,
                          MemberService memberService){
        this.contentMapper = contentMapper;
        this.contentRepository = contentRepository;
        this.em = em;
        this.memberService = memberService;
    }

    public long extractMemberId(Authentication authentication){
        Object principal = authentication.getPrincipal();
        Member user = (Member) principal;
        long memberId = user.getMemberId();
        return memberId;
    }

    public Content createContent(Authentication authentication, ContentPostDto contentPostDto){
        Content content = new Content();

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        content.setFont(contentPostDto.getFont());
        content.setFontSize(contentPostDto.getFontSize());
        content.setMember(member);
        content.setBody(contentPostDto.getBody());
        content.setTitle(contentPostDto.getTitle());
        content.setType(contentPostDto.getType());
        //사진 첨부 기능 추가

        Content savedContent = contentRepository.save(content);

        return savedContent;
    }

    public Content updateContent(long contentId, ContentPatchDto contentPatchDto){
        Content content = em.find(Content.class, contentId);

        content.setFont(contentPatchDto.getFont());
        content.setFontSize(contentPatchDto.getFontSize());
        content.setTitle(contentPatchDto.getTitle());
        content.setBody(contentPatchDto.getBody());
        content.setType(contentPatchDto.getType());

        return contentRepository.save(content);
    }

    public ContentResponseDto getContent(long contentId){
        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content content = optionalContent.get();

        long views = content.getViews();
        long add = views + 1;

        content.setViews(add);

        Content savedcontent = contentRepository.save(content);

        ContentResponseDto result = contentMapper.ContentToContentResponseDto(savedcontent, savedcontent.getMember().getMemberId());

        return result;
    }

    public void deleteContent(long contentId, long memberId){
        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content content = optionalContent.get();
        long writerId = content.getMember().getMemberId();

        if(writerId!=memberId){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);
        }
        else contentRepository.delete(content);
    }


}
