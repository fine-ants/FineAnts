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

INSERT INTO member(create_at, email, nickname, profile_url, provider)
VALUES (now(), 'qkdlfjtm119@naver.com', '일개미2aa1c3d7',
        'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'kakao')

