import { useEffect } from "react";

function TVTickerTapeWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: "KOSPI",
          proName: "KRX:KOSPI",
        },
        {
          description: "KOSDAQ",
          proName: "KRX:KOSDAQ",
        },
        {
          description: "달러인덱스",
          proName: "TVC:DXY",
        },
        {
          description: "SPX",
          proName: "SP:SPX",
        },
        {
          description: "KOSPI200",
          proName: "KRX:KOSPI200",
        },
        {
          description: "NASDAQ",
          proName: "NASDAQ:IXIC",
        },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "kr",
    });

    const container = document.querySelector(
      ".tradingview-widget-container__widget"
    );
    container?.appendChild(script);

    return () => {
      container?.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default TVTickerTapeWidget;
