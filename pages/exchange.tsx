import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { getExchangeDetails } from '@/api/functions'
import { Box, Button, Container, Modal, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styles from '@/styles/exchange.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const exchange = () => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["allexchange"],
        queryFn: getExchangeDetails,
    })
    if (isLoading) return <div><Typography variant='h2' my={5}>Loading...</Typography></div>
    // else if (!data || !data?.success) return <div>{error?.message}</div>
    // console.log(data?.exchanges);

    // const [open, setOpen] = useState<boolean>(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const [exdt, setexdt] = useState("");

    // const getdetails = (id: number) => {
    //     handleOpen()
    //     setexdt(id)
    // }

    // const { data: singleexchange } = useQuery({
    //     queryKey: ['singledetails', exdt],
    //     queryFn: async () => {
    //         const data = await axiosInstance.get(
    //             endPoints.fetchedexchange.exchangedetails(`${exdt}`)
    //         )
    //         console.log(data);
    //         return data?.data.data
    //     }
    // });

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
                <Link href={`exchangedetails/${params.row.exchangeId}`}>{params.row.exchangeId}</Link>,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
            editable: true,
            sortable: true,
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
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button onClick={() => (row.exchangeId)}>
                    Show
                </Button>,
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
            <Typography variant='h4' sx={{ textAlign: 'center', my: 2 }}>Exchange Page</Typography>
            {data ?
                <Container>
                    <Box sx={{ height: 400, width: '100%', backgroundColor: '#ff943975' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows as string[]}
                            getRowId={(row) => row.exchangeId}
                            // onRowClick={(row) =>handleRowClick(row?.exchangeId)}
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