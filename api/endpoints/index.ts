export const baseUrl = 'https://api.coincap.io'

export const endPoints = {
    fetchedCoinDetails: {
        allcoins: '/v2/assets',
        slugdetails: (id: string) => `/v2/assets/${id}`,
        // (interval: "m1" | "m5" | "m15" | "m30" | "h1 " | "h2" | "h6" | "h12" | "d1")
        historydetails:
            (id: string | string[] | undefined) =>
                `/v2/assets/${id}/history?interval=d1`,
        marketdetails: (id: string) => `/v2/assets/${id}/markets`
    },
    fetchedAllMarkets: {
        allmarket: '/v2/markets'
    },
    fetchedrates: {
        rates: '/v2/rates',
        ratedetails: (id: string) => `/v2/rates/${id}`
    },
    fetchedexchange: {
        coinexchange: '/v2/exchanges',
        exchangedetails: (id: string) => `/v2/exchanges/${id}`
    },
    fetchedcandle: {
        candles: (id: string) => `/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin%0A`
    }
}