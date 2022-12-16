package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.RestUserPost;
import com.dragos.sportsnetworkserver.model.UserPostDb;
import com.dragos.sportsnetworkserver.repository.UserPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserPostService {
    @Autowired
    private UserPostRepository userPostRepository;
    private UserService userService;

    public UserPostService (UserPostRepository userPostRepository, UserService userService) {
        this.userPostRepository = userPostRepository;
        this.userService = userService;
    }

    public List<RestUserPost> findAll() {
        List<RestUserPost> allUserPosts = new ArrayList<>();
        Iterable<UserPostDb> userPosts = userPostRepository.findAll();
        for(UserPostDb userPostDb : userPosts){
            allUserPosts.add(userPostDb.mapToRestUserPost());
        }
        return allUserPosts;
    }

    public UserPostDb saveUserPost(MultipartFile fileName, String caption) throws IOException {
        String userEmail = userService.getUsernameFromUserDetails();
        int id = userService.getUserIdFromEmail(userEmail);
        UserPostDb userPostDb = UserPostDb.mapToDbUserPost(fileName, caption, id);
        return userPostRepository.save(userPostDb);
    }

    public RestUserPost findById(int id) {
        return userPostRepository.findById(id).get().mapToRestUserPost();
    }

    public void deleteUserPostById(int id) {
        userPostRepository.deleteById(id);
    }

}
