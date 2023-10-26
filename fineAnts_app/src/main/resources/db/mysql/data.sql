LOAD DATA LOCAL INFILE 'src/main/resources/stocks.tsv'
    INTO TABLE stock
    FIELDS TERMINATED BY '\t'
    IGNORE 1 ROWS
    (@stockCode, @tickerSymbol, @companyName, @companyNameEng, @market)
    set stock_code = @stockCode,
        ticker_symbol = @tickerSymbol,
        company_name = @companyName,
        company_name_eng = @companyNameEng,
        market = @market,
        create_at = now();

INSERT INTO member(create_at, email, nickname, profile_url, provider)
VALUES (now(), 'qkdlfjtm119@naver.com', '일개미2aa1c3d7',
        'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'kakao')
