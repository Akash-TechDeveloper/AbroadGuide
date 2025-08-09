package com.abroadguide.authgateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    /**
     * Create a secure SecretKey from the configured secret.
     * HS512 requires at least 64 bytes.
     */
    private javax.crypto.SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey()) // ✅ SecretKey instead of plain String
                .compact();
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser() // ✅ New parser API
                .verifyWith((SecretKey) getSigningKey()) // ✅ SecretKey verification
                .build()
                .parseSignedClaims(token)
                .getPayload(); // ✅ getPayload() replaces getBody()

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token); // ✅ parseSignedClaims replaces parseClaimsJws
            return true;
        } catch (Exception e) {
            System.out.println("Token Validation Error: " + e.getMessage());
            return false;
        }
    }
}
