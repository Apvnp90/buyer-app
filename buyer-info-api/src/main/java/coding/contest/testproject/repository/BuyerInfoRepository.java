package coding.contest.testproject.repository;

import coding.contest.testproject.entity.BuyerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerInfoRepository extends JpaRepository<BuyerInfo, Long> {
}
