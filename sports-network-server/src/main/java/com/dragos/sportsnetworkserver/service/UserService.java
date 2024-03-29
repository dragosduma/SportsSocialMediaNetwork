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
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
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
            allUsers.add(mapToRestUser(userDb));
        }
        return allUsers;
    }

    public User findById(int id) {
        UserDb userDb = userRepository.findById(id).get();
        return mapToRestUser(userDb);
    }

    private Optional<UserDb> findByEmail(String email) {
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

    public UserDb getUserFromUsername(String username) {
        UserDb userDb = userRepository.findByEmail(username).get();
        return userDb;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDb userDb = getUserFromUsername(username);
        User user = mapToRestUser(userDb);
        if(userDb == null)
            throw new UsernameNotFoundException(username);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());
    }

    public boolean authenticate(String username, String password) {
        UserDb userDb = getUserFromUsername(username);

        if(userDb == null) {
            return false;
        }

        return BCrypt.checkpw(password, userDb.getPasswordHash());
    }

    private static UserDb mapToDbUser(User user) {
        UserDb u = new UserDb();
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        u.setPasswordHash(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        u.setPhoneNumber(user.getPhoneNumber());
        u.setRegisteredAt(LocalDateTime.now());
        u.setUserImage(user.getUserImage());
        return u;
    }

    public User mapToRestUser(UserDb userDb) {
        return User
                .builder()
                .id(userDb.getId())
                .firstName(userDb.getFirstName())
                .lastName(userDb.getLastName())
                .email(userDb.getEmail())
                .password(userDb.getPasswordHash())
                .phoneNumber(userDb.getPhoneNumber())
                .registeredAt(userDb.getRegisteredAt().atOffset(ZoneOffset.UTC))
                .userImage(userDb.getUserImage())
                .build();
    }

    private void createFirebaseUser(User user) throws FirebaseAuthException {
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

    private void updateUserCollection(User user, String uid) {
        Map<String,Object> docData = new HashMap<>();
        docData.put("displayName", user.getFirstName()+" "+user.getLastName());
        docData.put("email", user.getEmail());
        docData.put("uid", uid);

        ApiFuture<WriteResult> writeResult = db.collection("users").document(uid).set(docData, SetOptions.merge());
    }

    private void createUserChatCollection(String uid) {
        Map<String, Object> docData = new HashMap<>();
        ApiFuture<WriteResult> writeResult = db.collection("userChats").document(uid).set(docData);
    }
}

