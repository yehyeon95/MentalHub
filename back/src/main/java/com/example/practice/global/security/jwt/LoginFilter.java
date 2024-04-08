package com.example.practice.global.security.jwt;

import com.example.practice.global.security.dto.CustomUserDetails;
import com.example.practice.global.security.dto.LoginDto;
import com.example.practice.global.security.dto.LoginResponseDto;
import com.example.practice.member.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    //로그인 검증을 하는 authenticationManager 주입
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    //받은 로그인 정보를 서블릿 리퀘스트에서 꺼내오기
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("이 Authentication 메소드는 지원하지 않습니다. 로그인시 POST요청만 가능 : " + request.getMethod());
        }

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        //받은 유저네임 패스워드를 시큐리티에 넘기기 전 바구니에 담기
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        //토큰에 담은 내용을 authenticationManager에 전달
        return authenticationManager.authenticate(authToken);
    }

    //authenticationManager에서 로그인 성공시 실행하는 메소드.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication){
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Member member = (Member) authentication.getPrincipal();

        String email = customUserDetails.getUsername();
        long memberId = member.getMemberId();
        System.out.println("mmmmmmmmmmmmmmm"+memberId);

        Gson gson = new Gson();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(memberId, email, role, 60 * 60 * 2 * 1000L);


        response.addHeader("Authorization", "Bearer " + token);
        try {
            response.getWriter().println(gson.toJson(new LoginResponseDto(memberId,role)));
        } catch (IOException e) {

        }

    }
    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);

    }
}
