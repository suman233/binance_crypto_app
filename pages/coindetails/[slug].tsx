import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { AssestmarketRoot } from '@/typescript/interface/assetmarket'
import { SingleCoinRoot } from '@/typescript/interface/singleasset'
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import SingleHistory from './SingleHistory'
import { getHistory } from '@/api/functions'

export function getBitcoinHistory(id: string | string[] | undefined, interval: "m1" | "m5" | "m15" | "m30" | "h1 " | "h2" | "h6" | "h12" | "d1" = "d1") {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [`assets-${id}-history`],
        queryFn: () => getHistory(id, interval),
        refetchInterval: 1000,
        enabled: id ? true : false,
    });

    return { data, isLoading, error, isError };
}

const SingleDetails = () => {
    const router = useRouter()
    const { slug } = router.query;

    const [interval, setValue] = useState<"m1" | "m5" | "m15" | "m30" | "h1 " | "h2" | "h6" | "h12" | "d1">("h2");
    const handleInterval = (
        value: "m1" | "m5" | "m15" | "m30" | "h1 " | "h2" | "h6" | "h12" | "d1"
    ) => {
        setValue(value);
    };

    const singleHistory = getBitcoinHistory(slug, interval)

    const { isLoading, data, error } = useQuery({
        queryKey: ["singlecoindata", { slug }],
        enabled: !!slug,
        queryFn: async () => {
            const data = await axiosInstance.get<SingleCoinRoot>(
                // `/v2/assets/${slug}`
                endPoints.fetchedCoinDetails.slugdetails(`${slug}`)
            )
            console.log(data.data.data);
            return data?.data?.data
        }
    })

    const { isLoading: isLoad, data: coinsmarkets } = useQuery({
        queryKey: ["allmarkets", [slug]],
        enabled: !!slug,
        queryFn: async () => {
            const data = await axiosInstance.get(
                // `/v2/assets/${slug}`
                endPoints.fetchedCoinDetails.marketdetails(`${slug}`)
            )
            console.log(data.data.data);
            return data?.data?.data
        }
    })



    const { isLoading: isPend, data: coinhistory } = useQuery({
        queryKey: ["allhistory", [slug]],
        enabled: !!slug,
        queryFn: async () => {
            const data = await axiosInstance.get(
                endPoints.fetchedCoinDetails.historydetails(`${slug}`)
            )
            console.log(data.data.data);
            return data.data.data;

        }
    })
    // async (interval: string | "m1" | "m5" | "m15" | "m30" | "h1 " | "h2" | "h6" | "h12" | "d1") => {
    // const data = await axiosInstance.get(
    // endPoints.fetchedCoinDetails.historydetails(`${slug}`)
    // )
    // },

    // `/v2/assets/${id}/history?interval=${interval}`)

    const columns: GridColDef[] = [

        {
            field: 'exchangeId',
            headerName: 'Name', width: 100,

            headerClassName: 'super-app-theme--header',
            sortable: true,
        },
        {
            field: 'baseId',
            headerName: 'Base ID',
            headerClassName: 'super-app-theme--header',

            width: 110,
            sortable: true
        },
        {
            field: 'quoteId',
            headerName: 'Quote ID',
            headerClassName: 'super-app-theme--header',

            width: 110,
            sortable: true,
        },
        {
            field: 'baseSymbol',
            headerName: 'Symbol',
            headerClassName: 'super-app-theme--header',

            width: 80,
        },

        {
            field: 'priceUsd',
            headerName: 'Price (USD)',
            headerClassName: 'super-app-theme--header',

            type: 'number',
            width: 160,
        },
        {
            field: 'volumePercent',
            headerName: 'Volume Change (%)',
            headerClassName: 'super-app-theme--header',

            type: 'number',
            width: 160,
        },

    ]

    const rows = coinsmarkets?.map((item: any, index: number) => {
        item["index"] = index;
        return (
            item
        );
    })


    // const rows = data.map((item) => ({ ...item })) as unknown[] as RowData[]

    return (
        <div>
            <Container>
                <TableContainer >
                    <Table aria-label="customized table" sx={{mt:4}}>
                        <TableHead sx={{ backgroundColor: 'gray' }}>
                            <TableRow >
                                <TableCell >Rank</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Base Symbol</TableCell>
                                <TableCell >Supply</TableCell>
                                <TableCell >Pirce (USD)</TableCell>
                                <TableCell >MarketCap (USD)</TableCell>
                                <TableCell >Volume in 24Hr (%)</TableCell>
                                <TableCell >Change in Volume in 24Hr (%)</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                style={{ textDecoration: 'none' }}>
                                <TableCell>
                                    {data?.rank}
                                </TableCell>
                                <TableCell >{data?.name}</TableCell>
                                <TableCell >
                                    {data?.symbol}</TableCell>
                                <TableCell >{data?.supply}</TableCell>
                                <TableCell >{data?.priceUsd}</TableCell>
                                <TableCell >{data?.marketCapUsd}</TableCell>
                                <TableCell >{data?.volumeUsd24Hr}</TableCell>
                                <TableCell >{data?.changePercent24Hr}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={4} sx={{ my: 10 }}>
                    <Grid item xs={6} >
                        {coinsmarkets ?
                            <Box
                                sx={{
                                    height: 400,
                                    width: '100%',
                                    '& .super-app-theme--header': {
                                        backgroundColor: 'gray',
                                    },
                                }}
                            >
                                <DataGrid
                                    columns={columns}
                                    rows={rows as string[]}
                                    getRowId={(row) => row.exchangeId}
                                    sx={{
                                        boxShadow: 2,
                                        border: 2,
                                        borderColor: 'primary.light',
                                        '& .MuiDataGrid-cell:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5, 15, 25]}

                                />
                            </Box>
                            : null}

                    </Grid>
                    <Grid item xs={5}>
                        <SingleHistory historyData={singleHistory} handleChange={handleInterval} interval={interval} />

                    </Grid>
                </Grid>


            </Container>

        </div >
    );
}

export default SingleDetails