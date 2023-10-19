LOAD DATA LOCAL INFILE 'src/main/resources/stocks.tsv'
    INTO TABLE stock
    FIELDS TERMINATED BY '\t'
    IGNORE 1 ROWS
    (@stockcode, @ticker_symbol, @company_name, @eng_company_name, @market)
    set stockcode = @stockcode,
        ticker_symbol = @ticker_symbol,
        company_name = @company_name,
        eng_company_name = @eng_company_name,
        market = @market,
        create_at = now();

