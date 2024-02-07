import { MarketRoot } from "@/typescript/interface/marketlist";
import { axiosInstance } from "../axiosinstance";
import { endPoints } from "../endpoints";
import { AssestRoot } from "@/typescript/interface/assetlist";
import { SingleCoinRoot } from "@/typescript/interface/singleasset";
import { useRouter } from "next/router";


export const getassests = async () => {
    const data = await axiosInstance.get<AssestRoot>(
        endPoints.fetchedCoinDetails.allcoins
    )
    console.log(data?.data?.data);
    return data?.data?.data
}

export const getMareketDetails = async () => {

    const data = await axiosInstance.get<MarketRoot>(
        endPoints.fetchedAllMarkets.allmarket
    )
    // const time = data
    console.log(data.data);
    return data?.data?.data
}
export const getSingleCoin = async (id: string) => {
    const data = await axiosInstance.get<SingleCoinRoot>(
        endPoints.fetchedCoinDetails.slugdetails(id)
    )
    console.log(data.data);
    return data?.data?.data
}