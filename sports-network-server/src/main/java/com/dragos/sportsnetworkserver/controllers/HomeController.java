package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.model.JWTRequest;
import com.dragos.sportsnetworkserver.model.JWTResponse;
import com.dragos.sportsnetworkserver.service.UserService;
import com.dragos.sportsnetworkserver.utility.JWTUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class HomeController {

    @Autowired
    private JWTUtility jwtUtility;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "hello";
    }

    @PostMapping("/auth/login")
    public JWTResponse authenticate(@RequestBody JWTRequest jwtRequest) throws Exception{

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());
        final String token = jwtUtility.generateToken(userDetails);
        return new JWTResponse(token);
    }
}
