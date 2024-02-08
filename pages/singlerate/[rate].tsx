import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';

const ratedetails = () => {
    const router = useRouter()
    const { rate } = router.query
    const { data } = useQuery({
        queryKey: ['coinratedetails', { rate }],
        queryFn: async () => {
            const data = await axiosInstance.get(
                endPoints.fetchedrates.ratedetails(`${rate}`)
            )
            console.log(data);
            return data?.data.data
        }
    });
    
    return (
        <div>
            <Container>

                <TableContainer component={Paper} sx={{ my: 10 }}>
                    <Table aria-label="customized table">
                        <TableHead sx={{ backgroundColor: 'gray' }}>
                            <TableRow >
                                <TableCell >Name</TableCell>
                                <TableCell >Currency Symbol</TableCell>
                                <TableCell >Symbol</TableCell>
                                <TableCell >Type</TableCell>
                                <TableCell >Rate (USD)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {data?.id}
                                </TableCell>
                                <TableCell >{data?.currencySymbol}</TableCell>
                                <TableCell >
                                    {data?.symbol}</TableCell>
                                <TableCell >{data?.type}</TableCell>
                                <TableCell >{data?.rateUsd}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default ratedetails