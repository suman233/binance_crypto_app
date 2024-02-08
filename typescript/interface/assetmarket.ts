export interface AssestmarketRoot {
    data: Daum[]
    timestamp: number
  }
  
  export interface Daum {
    exchangeId: string
    baseId: string
    quoteId: string
    baseSymbol: string
    quoteSymbol: string
    volumeUsd24Hr: string
    priceUsd: string
    volumePercent: string
  }
  