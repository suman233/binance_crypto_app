import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Container, Slider } from "@mui/material";
import { getassests } from "@/api/functions";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["coinlists"],
    queryFn: getassests,
  })

  const columns: GridColDef[] = [
    { field: 'rank', headerName: 'Rank', width: 40 },

    {
      field: 'id', headerName: 'ID', width: 100,
      renderCell: (params) =>
        <Link href={`/coindetails/${params.row.id}`}>{params.row.id}</Link>,
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
