package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.UserPost;
import com.dragos.sportsnetworkserver.model.UserPostDb;
import com.dragos.sportsnetworkserver.repository.UserPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPostService {
    @Autowired
    private UserPostRepository userPostRepository;

    public UserPostService (UserPostRepository userPostRepository) {
        this.userPostRepository = userPostRepository;
    }

    public UserPostDb saveUserPost(UserPost userPost) {
        UserPostDb userPostDb = UserPostDb.mapToDbUserPost(userPost);
        return userPostRepository.save(userPostDb);
    }

    public UserPost findById(int id) {
        return userPostRepository.findById(id).get().mapToRestUserPost();
    }

    public void deleteUserPostById(int id) {
        userPostRepository.deleteById(id);
    }

}
