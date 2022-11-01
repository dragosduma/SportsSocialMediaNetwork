package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.UserMessage;
import com.dragos.sportsnetworkserver.model.UserMessageDb;
import com.dragos.sportsnetworkserver.repository.UserMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMessageService {
    @Autowired
    UserMessageRepository userMessageRepository;

    public UserMessageService (UserMessageRepository userMessageRepository) {
        this.userMessageRepository = userMessageRepository;
    }

    public UserMessageDb saveUserMessage(UserMessage userMessage) {
        UserMessageDb userMessageDb = UserMessageDb.mapToDbUserMessage(userMessage);
        return userMessageRepository.save(userMessageDb);
    }

    public void deleteMessageById(int id) {
        userMessageRepository.deleteById(id);
    }
}
