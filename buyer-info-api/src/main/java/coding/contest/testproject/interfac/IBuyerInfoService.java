package coding.contest.testproject.interfac;

import coding.contest.testproject.dto.request.BuyerInfoRequestDTO;
import coding.contest.testproject.dto.response.BuyerInfoResponseDTO;

import java.util.List;

public interface IBuyerInfoService {
    BuyerInfoResponseDTO saveBuyerInfo(BuyerInfoRequestDTO requestDTO);
    List<BuyerInfoResponseDTO> getAllBuyerInfo();
    String deleteBuyerInfo(Long id);
}
