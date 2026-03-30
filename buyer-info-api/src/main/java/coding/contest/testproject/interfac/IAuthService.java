package coding.contest.testproject.interfac;

import coding.contest.testproject.dto.request.LoginRequestDTO;
import coding.contest.testproject.dto.request.RegisterRequestDTO;
import coding.contest.testproject.dto.response.AuthResponseDTO;

public interface IAuthService {
    AuthResponseDTO register(RegisterRequestDTO registerRequest);
    AuthResponseDTO login(LoginRequestDTO loginRequest);
}
