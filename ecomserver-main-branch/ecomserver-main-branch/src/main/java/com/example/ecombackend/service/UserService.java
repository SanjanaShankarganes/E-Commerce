package com.example.ecombackend.service;
import java.nio.charset.StandardCharsets; 

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.ecombackend.DAO.UserRepository;
import com.example.ecombackend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret; 

    @Value("${jwt.expiration}")
    private long jwtExpiration; 

    public String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error while hashing password", e);
        }
    }

    public boolean authenticateUser(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .map(user -> user.getPassword().equals(hashPassword(rawPassword)))
                .orElse(false);
    }

    public boolean registerUser(User user) {
        user.setPassword(hashPassword(user.getPassword()));
        return userRepository.save(user) != null;
    }

    public boolean isUsernameTaken(String username) {
        return userRepository.findByName(username).isPresent();
    }

    public ApiResponse login(String email, String password) {
        if (authenticateUser(email, password)) {
            String jwt = createJwt(email); 
            return new ApiResponse(true, jwt);
        }
        return new ApiResponse(false, null); 
    }

    private String createJwt(String email) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiration = new Date(nowMillis + jwtExpiration);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact(); 
    }

    public String validateJwt(String jwt) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(jwt)
                    .getBody();
            return claims.getSubject(); 
        } catch (Exception e) {
            return null; 
        }
    }
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
