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
        'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg', 'kakao');

INSERT INTO fineAnts.portfolio (id, budget, maximum_loss, name, securities_firm, target_gain, member_id)
VALUES (1, 1000000, 900000, '내꿈은 워렌버핏', '토스', 1500000, 1);

INSERT INTO fineAnts.portfolio_holding (id, create_at, modified_at, annual_dividend,
                                        portfolio_id, stock_id)
VALUES (1, '2023-10-26 15:25:39.409612', '2023-10-26 15:25:39.409612', 0, 1, 890);

INSERT INTO fineAnts.purchase_history (id, create_at, modified_at, memo, num_shares, purchase_date,
                                       purchase_price_per_share, portfolio_holding_id)
VALUES (1, '2023-10-26 15:26:11.219793', '2023-10-26 15:26:11.219793', null, 3, '2023-10-23 13:00:00.000000', 50000, 1);


