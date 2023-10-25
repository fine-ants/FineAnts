package codesquad.fineants.elasticsearch.document;

import javax.persistence.Id;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

import codesquad.fineants.elasticsearch.helper.Indices;
import lombok.Getter;

@Getter
@Document(indexName = Indices.STOCK_INDEX)
@Setting(settingPath = "static/es-settings.json")
public class StockSearch {
	@Id
	@Field(type = FieldType.Keyword)
	private String id;
	@Field(type = FieldType.Text)
	private String stockcode;
	@Field(type = FieldType.Text)
	private String tickerSymbol;
	@Field(type = FieldType.Text)
	private String companyName;
	@Field(type = FieldType.Text)
	private String engCompanyName;
	@Field(type = FieldType.Text)
	private String market;
}
