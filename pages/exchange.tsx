import { getExchangeDetails } from '@/api/functions'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

const exchange = () => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["allexchange"],
        queryFn: getExchangeDetails,
    })
    if (isLoading) return <div><Typography variant='h2' my={5}>Loading...</Typography></div>
    // else if (!data || !data?.success) return <div>{error?.message}</div>
    // console.log(data?.exchanges);

    const columns: GridColDef[] = [

        {
            field: 'rank',
            headerName: 'Rank',
            width: 160,
            editable: true,
            sortable: true
        },
        {
            field: 'exchangeId', headerName: 'ID',
            width: 160,
            renderCell: (params) =>
                <Link href={`/${params.row.exchangeId}`}>{params.row.exchangeId}</Link>,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
            editable: true,
            sortable: true
        },
        {
            field: 'percentTotalVolume',
            headerName: 'Total Volume (%)',
            width: 160,
            editable: true,
        },
        {
            field: 'volumeUsd',
            headerName: 'Volume (USD)',
            width: 160,
            editable: true,
        },
        {
            field: 'tradingPairs',
            headerName: 'Trading Pairs',
            width: 160,
            editable: true,
        },
        {
            field: 'exchangeUrl',
            headerName: 'Exchange Url',
            width: 160,
            editable: true,
            renderCell: (params) =>
                <Link href={`${params.row.exchangeUrl}`}>{params.row.exchangeUrl}</Link>,
        },

    ]

    const rows = data?.map((item: any, index: number) => {
        item["index"] = index;
        return (
            item
        );
    })

    return (
        <div>
            {data ?
                <Container>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows as string[]}
                            getRowId={(row)=>row.exchangeId}
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
                </Container>
                : <></>}
        </div>
    );
}

export default exchange