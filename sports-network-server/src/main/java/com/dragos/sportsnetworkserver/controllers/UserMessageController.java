package com.dragos.sportsnetworkserver.controllers;

import com.dragos.sportsnetworkserver.api.UserMessageApi;
import com.dragos.sportsnetworkserver.model.UserMessage;
import com.dragos.sportsnetworkserver.service.UserMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserMessageController implements UserMessageApi {
    private UserMessageService userMessageService;

    public UserMessageController(UserMessageService userMessageService) {
        this.userMessageService = userMessageService;
    }


    @Override
    public ResponseEntity<Void> createUserMessage(UserMessage userMessage) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteUserMessage(String userMessageId) {
        return null;
    }

    @Override
    public ResponseEntity<UserMessage> getUserMessage(String userMessageId) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserMessage>> getUserMessages() {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateUserMessage(String userMessageId, UserMessage userMessage) {
        return null;
    }
}
