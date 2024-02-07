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