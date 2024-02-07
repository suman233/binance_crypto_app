import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { getSingleCoin } from '@/api/functions'
import { SingleCoinRoot } from '@/typescript/interface/singleasset'
import { Box, Container, TableCell, TableRow } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

const SingleDetails = () => {
    const router = useRouter()
    const { slug } = router.query;

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

    const columns: GridColDef[] = [
        { field: 'rank', headerName: 'Rank', width: 40 },

        {
            field: 'id', headerName: 'ID', width: 100
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 110,
            editable: true,
            sortable: true
        },
        {
            field: 'symbol',
            headerName: 'Symbol',
            width: 110,
            editable: true,
        },
        {
            field: 'supply',
            headerName: 'Supply',
            width: 120,
            editable: true,
        },
        {
            field: 'marketCapUsd',
            headerName: 'Market Cap (USD)',
            type: 'number',
            sortable: true,
            width: 160,
        },
        {
            field: 'priceUsd',
            headerName: 'Price (USD)',
            type: 'number',
            // sortable: false,
            width: 160,
        },
        {
            field: 'changePercent24Hr',
            headerName: 'Change Percent in 24Hr (%)',
            width: 170,
        },

        {
            field: 'volumeUsd24Hr',
            headerName: 'Volume in 24Hr (USD)',
            type: 'number',
            // sortable: false,
            width: 160,
        },
    ]

    const rows = data?.id
    // <TableRow>
    //     <TableCell component="th" scope="row">
    //         {data?.rank}
    //     </TableCell>
    //     <TableCell align="right">{data?.id}</TableCell>
    //     <TableCell align="right">{data?.name}</TableCell>
    //     <TableCell align="right">{data?.symbol}</TableCell>
    //     <TableCell align="right">{data?.supply}</TableCell>
    //     <TableCell align="right">{data?.marketCapUsd}</TableCell>
    //     <TableCell align="right">{data?.priceUsd}</TableCell>
    //     <TableCell align="right">{data?.volumeUsd24Hr}</TableCell>
    //     <TableCell align="right">{data?.changePercent24Hr}</TableCell>

    // </TableRow>


    return (
        <div>
            {data ?
                <Container>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows as any}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 1
                                    },
                                },
                            }}

                        />
                    </Box>
                </Container>
                : <></>}
        </div>
    );
}

export default SingleDetails