package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.model.JWTRequest;
import com.dragos.sportsnetworkserver.model.JWTResponse;
import com.dragos.sportsnetworkserver.service.UserService;
import com.dragos.sportsnetworkserver.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class HomeController {

    @Autowired
    private JWTUtility jwtUtility;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @PostMapping("/auth/login")
    public JWTResponse authenticate(@RequestBody JWTRequest jwtRequest) throws Exception{

        boolean isAuthenticated = userService.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        if (!isAuthenticated) {
            throw new Exception("INVALID_CREDENTIALS");
        }
        final UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());
        final String token = jwtUtility.generateToken(userDetails);
        return new JWTResponse(token);
    }
}
