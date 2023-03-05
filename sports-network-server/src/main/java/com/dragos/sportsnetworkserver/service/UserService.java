package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.exception.EmailAlreadyExistsException;
import com.dragos.sportsnetworkserver.model.User;
import com.dragos.sportsnetworkserver.model.UserDb;
import com.dragos.sportsnetworkserver.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    Firestore db = FirestoreClient.getFirestore();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDb saveUser(User user) throws EmailAlreadyExistsException, FirebaseAuthException {
        UserDb userDb = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);
        if(userDb == null) {
            userDb = mapToDbUser(user);
            createFirebaseUser(user);
            return userRepository.save(userDb);
        } else
            throw new EmailAlreadyExistsException("Email already exists");
    }

    public List<User> findAll() {
        List<User> allUsers = new ArrayList<>();
        Iterable<UserDb> users = userRepository.findAll();
        for(UserDb userDb : users){
            allUsers.add(userDb.mapToRestUser());
        }
        return allUsers;
    }

    public User findById(int id) {
        return userRepository.findById(id).get().mapToRestUser();
    }

    public Optional<UserDb> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDb updateUser(User user, int id) {
        UserDb userDb = userRepository.findById(id).get();
        if (Objects.nonNull(user.getFirstName()) && !"".equalsIgnoreCase(user.getFirstName())) {
            userDb.setFirstName(user.getFirstName());
        }
        return userRepository.save(userDb);
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    public int getUserIdFromEmail(String email) {
        Optional <UserDb> userDb = findByEmail(email);
        return userDb.get().getId();
    }

    public String getUsernameFromUserDetails()
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUsername();
    }

    public String getUsernameFromId(int id) {
        UserDb userDb = mapToDbUser(findById(id));
        return userDb.getEmail();
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<UserDb> userDb = userRepository.findByEmail(username);
        User user = userDb.get().mapToRestUser();
        if(userDb == null)
            throw new UsernameNotFoundException(username);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());
    }

    public static UserDb mapToDbUser(User user) {
        UserDb u = new UserDb();
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        u.setPasswordHash(user.getPassword());
        u.setPhoneNumber(user.getPhoneNumber());
        u.setRegisteredAt(LocalDateTime.now());
        u.setUserImage(user.getUserImage());
        return u;
    }

    public void createFirebaseUser(User user) throws FirebaseAuthException {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(user.getEmail())
                .setPassword(user.getPassword())
                .setDisplayName(user.getFirstName() + " " + user.getLastName())
                .setDisabled(false);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
        updateUserCollection(user, userRecord.getUid());
        createUserChatCollection(userRecord.getUid());
        System.out.println("Successfully created new user: " + userRecord.getUid());
    }

    public void updateUserCollection(User user, String uid) {
        Map<String,Object> docData = new HashMap<>();
        docData.put("displayName", user.getFirstName()+" "+user.getLastName());
        docData.put("email", user.getEmail());
        docData.put("uid", uid);

        ApiFuture<WriteResult> writeResult = db.collection("users").document(uid).set(docData, SetOptions.merge());
    }

    public void createUserChatCollection(String uid) {
        Map<String, Object> docData = new HashMap<>();
        ApiFuture<WriteResult> writeResult = db.collection("userChats").document(uid).set(docData);
    }
}

