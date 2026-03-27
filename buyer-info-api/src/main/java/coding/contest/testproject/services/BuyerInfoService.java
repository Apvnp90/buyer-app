package coding.contest.testproject.services;

import coding.contest.testproject.dto.request.BuyerInfoRequestDTO;
import coding.contest.testproject.dto.response.BuyerInfoResponseDTO;
import coding.contest.testproject.entity.BuyerInfo;
import coding.contest.testproject.interfac.IBuyerInfoService;
import coding.contest.testproject.repository.BuyerInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuyerInfoService implements IBuyerInfoService {

    private final BuyerInfoRepository buyerInfoRepository;

    public BuyerInfoService(BuyerInfoRepository buyerInfoRepository) {
        this.buyerInfoRepository = buyerInfoRepository;
    }

    @Override
    public BuyerInfoResponseDTO saveBuyerInfo(BuyerInfoRequestDTO requestDTO) {
        BuyerInfo buyerInfo = new BuyerInfo();
        buyerInfo.setFirstName(requestDTO.getFirstName());
        buyerInfo.setLastName(requestDTO.getLastName());
        buyerInfo.setAddressLine1(requestDTO.getAddressLine1());
        buyerInfo.setAddressLine2(requestDTO.getAddressLine2());
        buyerInfo.setCity(requestDTO.getCity());
        buyerInfo.setState(requestDTO.getState());
        buyerInfo.setCountry(requestDTO.getCountry());
        buyerInfo.setPhoneNumber(requestDTO.getPhoneNumber());
        buyerInfo.setEmailAddress(requestDTO.getEmailAddress());

        BuyerInfo savedBuyerInfo = buyerInfoRepository.save(buyerInfo);

        return mapToResponseDTO(savedBuyerInfo);
    }

    @Override
    public List<BuyerInfoResponseDTO> getAllBuyerInfo() {
        List<BuyerInfo> buyerInfoList = buyerInfoRepository.findAll();
        return buyerInfoList.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteBuyerInfo(Long id) {
        BuyerInfo buyerInfo = buyerInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Buyer not found with id: " + id));
        String firstName = buyerInfo.getFirstName();
        buyerInfoRepository.deleteById(id);
        return firstName;
    }

    private BuyerInfoResponseDTO mapToResponseDTO(BuyerInfo buyerInfo) {
        BuyerInfoResponseDTO responseDTO = new BuyerInfoResponseDTO();
        responseDTO.setId(buyerInfo.getId());
        responseDTO.setFirstName(buyerInfo.getFirstName());
        responseDTO.setLastName(buyerInfo.getLastName());
        responseDTO.setAddressLine1(buyerInfo.getAddressLine1());
        responseDTO.setAddressLine2(buyerInfo.getAddressLine2());
        responseDTO.setCity(buyerInfo.getCity());
        responseDTO.setState(buyerInfo.getState());
        responseDTO.setCountry(buyerInfo.getCountry());
        responseDTO.setPhoneNumber(buyerInfo.getPhoneNumber());
        responseDTO.setEmailAddress(buyerInfo.getEmailAddress());
        return responseDTO;
    }
}
