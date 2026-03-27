package coding.contest.testproject.controller;

import coding.contest.testproject.dto.request.BuyerInfoRequestDTO;
import coding.contest.testproject.dto.response.BuyerInfoResponseDTO;
import coding.contest.testproject.interfac.IBuyerInfoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer-info")
public class BuyerInfoController {

    private final IBuyerInfoService buyerInfoService;

    public BuyerInfoController(IBuyerInfoService buyerInfoService) {
        this.buyerInfoService = buyerInfoService;
    }

    @PostMapping
    public ResponseEntity<BuyerInfoResponseDTO> saveBuyerInfo(@Valid @RequestBody BuyerInfoRequestDTO requestDTO) {
        BuyerInfoResponseDTO responseDTO = buyerInfoService.saveBuyerInfo(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<java.util.List<BuyerInfoResponseDTO>> getAllBuyerInfo() {
        java.util.List<BuyerInfoResponseDTO> buyerInfoList = buyerInfoService.getAllBuyerInfo();
        return new ResponseEntity<>(buyerInfoList, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuyerInfo(@PathVariable Long id) {
        String firstName = buyerInfoService.deleteBuyerInfo(id);
        return new ResponseEntity<>("Buyer '" + firstName + "' has been deleted successfully", HttpStatus.OK);
    }
}
