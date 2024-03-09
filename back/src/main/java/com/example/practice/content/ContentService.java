package com.example.practice.content;

import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.member.Member;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContentService {
    private final ContentMapper contentMapper;
    private final ContentService contentService;
    private final ContentRepository contentRepository;
    private final EntityManager em;

    public ContentService(ContentMapper contentMapper,
                             ContentService contentService,
                             ContentRepository contentRepository,
                          EntityManager em){
        this.contentMapper = contentMapper;
        this.contentService = contentService;
        this.contentRepository = contentRepository;
        this.em = em;
    }

    public Content createContent(long memberId, ContentPostDto contentPostDto){
        Content content = new Content();

        content.setFont(contentPostDto.getFont());
        content.setFontSize(contentPostDto.getFontSize());
        content.setMemberId(memberId);
        content.setBody(contentPostDto.getBody());
        content.setTitle(contentPostDto.getTitle());
        content.setType(contentPostDto.getType());
        //사진 첨부 기능 추가

        Content savedContent = contentRepository.save(content);

        return savedContent;
    }


}
