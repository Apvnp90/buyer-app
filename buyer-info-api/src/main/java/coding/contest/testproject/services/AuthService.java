package coding.contest.testproject.services;

import coding.contest.testproject.dto.request.LoginRequestDTO;
import coding.contest.testproject.dto.request.RegisterRequestDTO;
import coding.contest.testproject.dto.response.AuthResponseDTO;
import coding.contest.testproject.entity.User;
import coding.contest.testproject.exception.DuplicateEmailException;
import coding.contest.testproject.exception.DuplicateUsernameException;
import coding.contest.testproject.exception.InvalidCredentialsException;
import coding.contest.testproject.interfac.IAuthService;
import coding.contest.testproject.repository.UserRepository;
import coding.contest.testproject.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public AuthResponseDTO register(RegisterRequestDTO registerRequest) {
        logger.info("Attempting to register user: {}", registerRequest.getUsername());
        
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            logger.warn("Registration failed: username already exists - {}", registerRequest.getUsername());
            throw new DuplicateUsernameException("Username already exists");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.warn("Registration failed: email already exists - {}", registerRequest.getEmail());
            throw new DuplicateEmailException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("USER");
        
        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());
        
        String token = jwtUtil.generateToken(user.getUsername());
        
        return new AuthResponseDTO(token, user.getUsername(), user.getEmail());
    }
    
    @Override
    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        logger.info("Attempting to login user: {}", loginRequest.getUsername());
        
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> {
                    logger.warn("Login failed: invalid username - {}", loginRequest.getUsername());
                    return new InvalidCredentialsException("Invalid username or password");
                });
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            logger.warn("Login failed: invalid password for user - {}", loginRequest.getUsername());
            throw new InvalidCredentialsException("Invalid username or password");
        }
        
        logger.info("User logged in successfully: {}", user.getUsername());
        
        String token = jwtUtil.generateToken(user.getUsername());
        
        return new AuthResponseDTO(token, user.getUsername(), user.getEmail());
    }
}
