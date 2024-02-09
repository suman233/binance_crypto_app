import { getRateDetails } from '@/api/functions'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

const rate = () => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["allrates"],
        queryFn: getRateDetails,
    })

    const columns: GridColDef[] = [

        {
            field: 'id', headerName: 'ID', width: 300,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) =>
                <Link href={`singlerate/${params.row.id}`}>{params.row.id}</Link>,
        },
        {
            field: 'currencySymbol',
            headerName: 'Currency Symbol',
            headerClassName: 'super-app-theme--header',
            width: 160,
            editable: true,
            sortable: true
        },
        {
            field: 'symbol',
            headerName: 'Symbol',
            headerClassName: 'super-app-theme--header',
            width: 160,
            editable: true,
        },
        {
            field: 'rateUsd',
            headerName: 'Rate (USD)',
            headerClassName: 'super-app-theme--header',
            width: 300,
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Type',
            headerClassName: 'super-app-theme--header',
            // align: 'center',
            width: 230,
            editable: true,
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
            <Typography variant='h4' sx={{ textAlign: 'center', my: 2 }}>Rate Page</Typography>

            {data ?
                <Container>
                    <Box sx={{
                        height: 400, width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: 'gray',
                        }, backgroundColor: '#ff943975'
                    }}>
                        <DataGrid
                            columns={columns}
                            rows={rows as string[]}
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

export default rate