import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { getExchangeDetails } from '@/api/functions'
import { Box, Button, Container, Modal, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
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
            // renderCell: (id: any) => {
            //     handleOpen()
            //     setexdt(id)
            // }
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

    // const [openmodal, setOpenModal] = useState(0);
    // const handleOpen = () => {
    //     setOpenModal(1);
    // };

    // const handleClose = () => {
    //     setOpenModal(0);
    // };

    // const [exdt, setexdt] = useState("");

    // const getdetails = (id: any) => {
    //     handleOpen()
    //     setexdt(id)
    // }

    // const handleRowClick = (params: any) => {
    //     handleOpen()
    //     setexdt(params.row.id)
    //     alert(`Model code "${params.row.name}"  selected`)
    // };

    
    return (
        <div>
            <Typography variant='h4' sx={{ textAlign: 'center', my: 2 }}>Exchange Page</Typography>
            {data ?
                <Container>
                    <Box sx={{ height: 400, width: '100%' }}>
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
            {/* <Modal
                open={openmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Name: {singledata?.name?.toUpperCase()}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Volume (USD): {singledata?.volumeUsd}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        TradingPair: {singledata?.tradingPairs}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        Rate: {Number(singledata?.percentTotalVolume).toFixed(4)}%
                    </Typography>
                    <div style={{ display: 'flex' }}>
                        <Button className={styles.btn_modal} sx={{
                            textTransform: 'none', mr: 6
                        }}><Link href={`${singledata?.exchangeUrl}`} style={{ textDecoration: 'none', color: 'white' }}>Show</Link></Button>
                        <Button onClick={handleClose} className={styles.btn_modal} sx={{
                            textTransform: 'none'
                        }}>Close</Button>
                    </div>

                </Box>
            </Modal> */}
        </div>
    );
}

export default exchange