export const baseUrl = 'https://api.coincap.io'

export const endPoints = {
    fetchedCoinDetails: {
        allcoins: '/v2/assets',
        slugdetails: (id: string) => `/v2/assets/${id}`,
        historydetails: (id: number) => `/v2/assets/${id}/history?interval=d1`,
        marketdetails: (id: number) => `/v2/assets/${id}/markets`
    },
    fetchedAllMarkets: {
        allmarket: '/v2/markets'
    },
    fetchedrates: {
        rates: '/v2/rates',
        ratedetails: (id: number) => `/v2/rates/${id}`
    },
    fetchedexchange: {
        coinexchange: '/v2/exchanges',
        exchangedetails: (id: number) => `/v2/exchanges/${id}`
    },
    fetchedcandle: {
        candles: '/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin%0A'
    }
}