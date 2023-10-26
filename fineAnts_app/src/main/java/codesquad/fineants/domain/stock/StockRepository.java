package codesquad.fineants.domain.stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StockRepository extends JpaRepository<Stock, Long> {

	@Query("select s from Stock s where s.stockcode like %:keyword% or s.tickerSymbol like %:keyword% or s.companyName like %:keyword% or s.engCompanyName like %:keyword%")
	List<Stock> search(@Param("keyword") String keyword);
}
