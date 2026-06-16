package com.dev.topicjot.services;

import com.dev.topicjot.dto.UserDTO;
import com.dev.topicjot.models.User;
import com.dev.topicjot.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserDTO> getUser(Long id) {
        return userRepository.findById(id).map(UserDTO::new);
    }

    public User getByEmailAndPassword(String email, String password) {
        User user = userRepository.findByEmail(email);
        return (user != null && passwordEncoder.matches(password, user.getPassword())) ? user : null;
    }

    public void addUser(UserDTO userDTO) {
        User user = new User(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        this.userRepository.save(user);
    }

    public void updateUser(Long id, UserDTO userDTO) {
        this.userRepository.findById(id).ifPresent(existingUser -> {
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setName(userDTO.getName());
            if (userDTO.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }
            userRepository.save(existingUser);
        });
    }

    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + email);
        }
        return user;
    }
}
