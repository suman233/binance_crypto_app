import dynamic from 'next/dynamic';
import React, { useCallback, useEffect } from 'react'
import { Box, Container } from '@mui/material';
import SelectInterval from '../../components/IntervalSelector';
import { useState } from 'react';
import { useRouter } from 'next/router';
const Graph = dynamic(() => import('./Graph'), {
    ssr: false
});


interface SingleDataInterface {
    id: string | string[] | undefined;
}

const SingleHistory = ({ handleChange, historyData, interval }: any) => {

    const { data, isLoading, isError, error }: any = historyData || {}

    console.log("history");



    const [chartData, setChartData] = useState<{ xAxis: number[], yAxis: number[] }>({
        xAxis: [1, 2, 3],
        yAxis: [1, 2, 3]
    })


    useEffect(() => {
        if (data && !isLoading) {
            let xAxis: number[] = []
            let yAxis: number[] = []
            data?.map((item: { time: any, priceUsd: String }) => {
                xAxis.push(item.time)
                yAxis.push(Number(item.priceUsd))
            })
            setChartData({
                xAxis,
                yAxis
            })
            // console.table(xAxis)
            // console.table(yAxis)
        }

    }, [interval, data, isLoading])

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px"
                }}
            >
                <SelectInterval interval={interval} handleChange={handleChange} />

                <Graph xAxis={chartData.xAxis} yAxis={chartData.yAxis} />

            </Box>
        </Container>
    );
}

export default React.memo(SingleHistory, (prevProps, postProps): any => {
    return (
        prevProps.id === postProps.id
    )
})
