import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';

const exchangedetails = () => {
    const router = useRouter()
    const { slug } = router.query
    const { data } = useQuery({
        queryKey: ['excoindetails', { slug }],
        queryFn: async () => {
            const data = await axiosInstance.get(
                endPoints.fetchedexchange.exchangedetails(`${slug}`)
            )
            console.log(data);
            return data?.data.data
        }
    });


    return (
        <div>
            <Container>

                <TableContainer component={Paper} sx={{my:10}}>
                    <Table aria-label="customized table">
                        <TableHead sx={{ backgroundColor: 'gray' }}>
                            <TableRow >
                                <TableCell >ID</TableCell>
                                <TableCell >Rank</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Total Volume (%) </TableCell>
                                <TableCell >Trading Pairs</TableCell>
                                <TableCell >Volume (USD)</TableCell>
                                <TableCell >Exchange Url</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {data?.exchangeId}
                                </TableCell>
                                <TableCell >{data?.rank}</TableCell>
                                <TableCell >
                                    {data?.name}</TableCell>
                                <TableCell >{data?.percentTotalVolume}</TableCell>
                                <TableCell >{data?.volumeUsd}</TableCell>
                                <TableCell >{data?.tradingPairs}</TableCell>
                                <TableCell><Link href={`${data?.exchangeUrl}`}>{data?.exchangeUrl}</Link></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default exchangedetails