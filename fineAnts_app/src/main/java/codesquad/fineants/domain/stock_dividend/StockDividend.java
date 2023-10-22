package codesquad.fineants.domain.stock_dividend;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import codesquad.fineants.domain.stock.Stock;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class StockDividend {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime dividendMonths;
	private Long dividend;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stock_id")
	private Stock stock;

	@Builder
	public StockDividend(Long id, LocalDateTime dividendMonths, Long dividend, Stock stock) {
		this.id = id;
		this.dividendMonths = dividendMonths;
		this.dividend = dividend;
		this.stock = stock;
	}

	public boolean isMonthlyDividend(LocalDateTime monthDateTime) {
		return dividendMonths.getYear() == monthDateTime.getYear()
			&& dividendMonths.getMonthValue() == monthDateTime.getMonthValue();
	}
}
