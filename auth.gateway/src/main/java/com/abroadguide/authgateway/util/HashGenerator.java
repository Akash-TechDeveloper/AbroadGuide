package com.abroadguide.authgateway.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGenerator {
    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("newpassword123"));
    }
}