import { getMareketDetails } from '@/api/functions'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortApi, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid'
import React from 'react'
import { useQuery } from 'react-query'
import loaderanimation from '@/json/lottie/LottieLoader.json'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import("lottie-react"));
const market = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["allmarkets"],
        queryFn: getMareketDetails,
    })

    // if (isLoading) {
    //     return <h1>Loading...</h1>
    // }

    // const getRowIndex = React.useCallback<GridSortApi['getRowIndex']>(
    //     (id) => useGridApiRef. .current.getSortedRowIds().indexOf(id),
    //     [apiRef],
    // );
    const columns: GridColDef[] = [
        // {
        //     field: 'id',
        //     headerName: 'SL No',
        //     type: 'number',
        //     renderCell: (params) =>
        //         params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
        //     // renderCell: (params) => params.api.getRowIndex(params.row.id) + 1,
        // },

        {
            field: 'id',
            headerName: 'Serial No.',
            headerClassName: 'super-app-theme--header',
            filterable: false,
            renderCell: (params) => {
                return Number(params.id || 0) + 1
            }
        },

        { field: 'rank', headerName: 'Rank', headerClassName: 'super-app-theme--header', width: 30, sortable: true },
        {
            field: 'exchangeId',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            width: 110,
            sortable: true,
        },
        {
            field: 'baseSymbol',
            headerName: 'Symbol',
            headerClassName: 'super-app-theme--header',
            width: 70,
            sortable: true,
        },
        {
            field: 'baseId',
            headerName: 'Base ID',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            width: 100,
        },
        {
            field: 'quoteSymbol',
            headerName: 'Quote Symbol',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            width: 100,
        },
        {
            field: 'priceUsd',
            headerName: 'Price (USD)',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            width: 160,
        },
        {
            field: 'priceQuote',
            headerName: 'Quote Price (USD)',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            width: 120,
        },

        {
            field: 'volumeUsd24Hr',
            headerName: 'Volume in 24Hr (USD)',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            width: 160,
        },
        {
            field: 'tradesCount24Hr',
            headerName: 'Trade Count in 24Hr (USD)',
            headerClassName: 'super-app-theme--header',
            type: 'number',
            align: 'center',
            width: 180,
        }
    ];

    const rows = data?.map((item: any, index: number) => {
        item["ownIndex"] = index;
        return item;
    })

    return (
        <div>
            <Typography variant="h4" textAlign={'center'} sx={{ textAlign: 'center', my: 4, fontWeight: 'bold' }}>Market Page</Typography>

            {data ?
                <Container>
                    <Box sx={{
                        height: 400, width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: 'gray',
                        }, backgroundColor:'#ff943975'
                    }}>
                        <DataGrid
                            columns={columns}
                            rows={rows as string[]}
                            getRowId={(row) => row.ownIndex}
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
                :
                <div style={{ textAlign: 'center' }}>
                    <Lottie
                        className="Loader_image"
                        animationData={loaderanimation}
                        loop
                        style={{
                            height: 300,
                            width: '100%',
                        }}
                        height={300}
                        width={'100%'}

                    />
                </div>
            }
        </div>
    );
}

export default market

