import { getMareketDetails } from '@/api/functions'
import { Box, Container } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { useQuery } from 'react-query'

const market = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["allmarkets"],
        queryFn: getMareketDetails,
    })

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const columns: GridColDef[] = [
        // {
        //     field: 'id', headerName: 'Sl No.', width: 30, type:'number'
        // },
        { field: 'rank', headerName: 'Rank', width: 30 },
        {
            field: 'exchangeId',
            headerName: 'Name',
            width: 110,
            editable: true,
        },
        {
            field: 'baseSymbol',
            headerName: 'Symbol',
            width: 110,
            editable: true,
        },
        {
            field: 'baseId',
            headerName: 'Base ID',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'quoteSymbol',
            headerName: 'Quote Symbol',
            type: 'number',
            // sortable: false,
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
            field: 'priceQuote',
            headerName: 'Quote Price (USD)',
            type: 'number',
            // sortable: false,
            width: 120,
        },

        {
            field: 'volumeUsd24Hr',
            headerName: 'Volume in 24Hr (USD)',
            type: 'number',
            // sortable: false,
            width: 160,
        },
        {
            field: 'tradesCount24Hr',
            headerName: 'Trade Count in 24Hr (USD)',
            type: 'number',
            // sortable: false,
            width: 160,
        }
    ];

    const rows = data?.map((item: any, index: any) => {
        item["index"] = index;
        return item;
    })

    return (
        <div>
            <Container>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows as string[]}
                        getRowId={(row) => row.rank}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 15, 25]}

                    />
                </Box>
            </Container>
        </div>
    )
}

export default market