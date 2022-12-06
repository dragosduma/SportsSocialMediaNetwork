package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.UserPost;
import com.dragos.sportsnetworkserver.model.UserPostDb;
import com.dragos.sportsnetworkserver.repository.UserPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserPostService {
    @Autowired
    private UserPostRepository userPostRepository;

    public UserPostService (UserPostRepository userPostRepository) {
        this.userPostRepository = userPostRepository;
    }

    public List<UserPost> findAll() {
        List<UserPost> allUserPosts = new ArrayList<>();
        Iterable<UserPostDb> userPosts = userPostRepository.findAll();
        for(UserPostDb userPostDb : userPosts){
            allUserPosts.add(userPostDb.mapToRestUserPost());
        }
        return allUserPosts;
    }

    public UserPostDb saveUserPost(MultipartFile fileName, String caption) {
        UserPostDb userPostDb = UserPostDb.mapToDbUserPost(fileName, caption);
        return userPostRepository.save(userPostDb);
    }

    public UserPost findById(int id) {
        return userPostRepository.findById(id).get().mapToRestUserPost();
    }

    public void deleteUserPostById(int id) {
        userPostRepository.deleteById(id);
    }

}
