export interface MarketRoot {
    data: Daum[]
    timestamp: number
  }
  
  export interface Daum {
    exchangeId: string
    rank: string
    baseSymbol: string
    baseId: string
    quoteSymbol: string
    quoteId: string
    priceQuote: string
    priceUsd: string
    volumeUsd24Hr?: string
    percentExchangeVolume?: string
    tradesCount24Hr?: string
    updated: number
  }
  
  // exchangeId": "alterdice",
  //     "rank": "1",
  //     "baseSymbol": "FTM",
  //     "baseId": "fantom",
  //     "quoteSymbol": "USDT",
  //     "quoteId": "tether",
  //     "priceQuote": "0.3997000000000000",
  //     "priceUsd": "0.3995755128683463",
  //     "volumeUsd24Hr": "0.0000000000000000",
  //     "percentExchangeVolume": null,
  //     "tradesCount24Hr": "1415",
  //     "updated": 1707337366327