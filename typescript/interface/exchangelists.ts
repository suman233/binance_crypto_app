export interface ExchangeRoot {
    data: DataExchange[]
    timestamp: number
}

export interface DataExchange {
    exchangeId: string
    name: string
    rank: string
    percentTotalVolume: string
    volumeUsd: string
    tradingPairs: string
    socket: boolean
    exchangeUrl: string
    updated: number
}

// "exchangeId": "binance",
//       "name": "Binance",
//       "rank": "1",
//       "percentTotalVolume": "38.676070033224886680000000000000000000",
//       "volumeUsd": "5097499867.0528027595784709",
//       "tradingPairs": "793",
//       "socket": true,
//       "exchangeUrl": "https://www.binance.com/",
//       "updated": 1707337406757