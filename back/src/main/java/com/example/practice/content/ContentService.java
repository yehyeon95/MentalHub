package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentRepository;
import com.example.practice.content.ContentDto.ContentPatchDto;
import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.member.memberDto.MemberResponseDto;
import com.example.practice.reply.ReplyRepository;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ContentService {
    private final ContentMapper contentMapper;
    private final ContentRepository contentRepository;
    private final EntityManager em;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    public ContentService(ContentMapper contentMapper,
                          ContentRepository contentRepository,
                          EntityManager em,
                          MemberService memberService,
                          CommentRepository commentRepository,
                          ReplyRepository replyRepository){
        this.contentMapper = contentMapper;
        this.contentRepository = contentRepository;
        this.em = em;
        this.memberService = memberService;
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
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

        ContentResponseDto result = contentMapper.ContentToContentResponseDto(savedcontent, savedcontent.getMember().getMemberId(),
                getCommentsCount(savedcontent.getContentId()));

        return result;
    }

    //전체 게시글 출력
    public Page<Content> findPageContent(String type, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        return contentRepository.findAllByTypeOrderByContentIdDesc(type, pageRequest);
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

    public Content findVerifiedContent(long contentId) {
        Optional<Content> optionalContent =
                contentRepository.findByContentId(contentId);
        Content findContent =
                optionalContent.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));
        return findContent;
    }

    //게시글의 댓글수 반환
    public long getCommentsCount(long contentId){
        Content content = findVerifiedContent(contentId);
        long commentsCnt = Long.valueOf(commentRepository.countAllByContent(content));
        long repliesCnt = Long.valueOf(replyRepository.countAllByContent(content));

        long result = commentsCnt+repliesCnt;

        return result;
    }

    //게시글의 댓글 리스트 반환
    public List<Comment> findVerifyComments(long contentId){
        Content content = findVerifiedContent(contentId);
        List<Comment> findComments = commentRepository.findAllByContent(content);

        return findComments;
    }


}
