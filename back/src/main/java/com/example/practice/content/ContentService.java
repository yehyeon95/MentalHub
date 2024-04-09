package com.example.practice.content;

import com.example.practice.comment.Comment;
import com.example.practice.comment.CommentMapper;
import com.example.practice.comment.CommentRepository;
import com.example.practice.comment.CommentService;
import com.example.practice.comment.commentDto.CommentResponseDto;
import com.example.practice.content.ContentDto.ContentPatchDto;
import com.example.practice.content.ContentDto.ContentPostDto;
import com.example.practice.content.ContentDto.ContentResponseDto;
import com.example.practice.global.exception.BusinessLogicException;
import com.example.practice.global.exception.ExceptionCode;
import com.example.practice.member.Member;
import com.example.practice.member.MemberService;
import com.example.practice.member.memberDto.MemberResponseDto;
import com.example.practice.reply.ReplyRepository;
import com.example.practice.vote.VoteService;
import com.example.practice.vote.contentvote.ContentVote;
import com.example.practice.vote.contentvote.ContentVoteRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ContentService {
    private final ContentMapper contentMapper;
    private final ContentRepository contentRepository;
    private final EntityManager em;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final CommentService commentService;
    private final VoteService voteService;
    private final ReplyRepository replyRepository;
    private final ContentVoteRepository contentVoteRepository;



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
        content.setModified(false);

        Content savedContent = contentRepository.save(content);

        return savedContent;
    }

    public ContentResponseDto updateContent(long contentId, ContentPatchDto contentPatchDto, Authentication authentication){
        Content content = em.find(Content.class, contentId);

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        if(content.getMember().getMemberId()!=memberId){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER);
        }

        content.setFont(contentPatchDto.getFont());
        content.setFontSize(contentPatchDto.getFontSize());
        content.setTitle(contentPatchDto.getTitle());
        content.setBody(contentPatchDto.getBody());
        content.setType(contentPatchDto.getType());
        content.setModified(true);

        Content savedContent = contentRepository.save(content);

        ContentResponseDto result = contentMapper.ContentToContentResponseDto(savedContent,getCommentsCount(savedContent.getContentId()),
                getContentVotesCount(savedContent.getContentId()),checkMemberContentVoted(member, savedContent));

        return result;
    }

    public ContentResponseDto getContent(long contentId){
        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content content = optionalContent.get();


        long views = content.getViews();
        long add = views + 1;

        content.setViews(add);

        Content savedContent = contentRepository.save(content);

        ContentResponseDto result = contentMapper.ContentToContentResponseDto(savedContent, getCommentsCount(savedContent.getContentId()),
                getContentVotesCount(savedContent.getContentId()),false);

        return result;
    }
    public ContentResponseDto getContentLogin(long contentId, Authentication authentication){

        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content content = optionalContent.get();

        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        long views = content.getViews();
        long add = views + 1;

        content.setViews(add);

        Content savedContent = contentRepository.save(content);

        ContentResponseDto result = contentMapper.ContentToContentResponseDto(savedContent, getCommentsCount(savedContent.getContentId()),
                getContentVotesCount(savedContent.getContentId()),checkMemberContentVoted(member, savedContent));

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

    //게시글 추천수 반환
    public long getContentVotesCount(long contentId){
        Content content = findVerifiedContent(contentId);
        long contentVotesCnt = Long.valueOf(contentVoteRepository.countAllByContent(content));

        return contentVotesCnt;
    }
    //유저가 게시글에 추천한 적이 있는지 확인
    public boolean checkMemberContentVoted(Member member, Content content) {
        boolean isExist = contentVoteRepository.existsByMemberAndContent(member, content);

        return isExist;
    }

    //댓글리스트를 댓글리스폰스 리스트로 변환
    public List<CommentResponseDto> commentListToCommentResponseList(List<Comment> commentList,Authentication authentication){
        long memberId = extractMemberId(authentication);
        Member member = memberService.findVerifiedMember(memberId);

        List<CommentResponseDto> result =
                commentList.stream()
                        .map(comment-> commentMapper.CommentToCommentResponseDto(comment,replyRepository.findAllByComment(comment),
                                voteService.countCommentVotes(comment), voteService.checkMemberCommentVoted(member, comment)))
                        .collect(Collectors.toList());
        return result;
    }


}
