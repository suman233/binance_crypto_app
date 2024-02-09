import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Container, Slider, Typography } from "@mui/material";
import { getassests } from "@/api/functions";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { green, red } from "@mui/material/colors";
// import styles from "@/styles/Home.module.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import dynamic from "next/dynamic";
import loaderanimate from '@/json/lottie/Loading.json'
import loaderanimation from '@/json/lottie/LottieLoader.json'

const Lottie = dynamic(() => import("lottie-react"));

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["coinlists"],
    queryFn: getassests,
  })

  const columns: GridColDef[] = [
    {
      field: 'rank', headerName: 'Rank',
      headerClassName: 'super-app-theme--header',

      width: 40
    },

    {
      field: 'id', headerName: 'ID', width: 100,
      headerClassName: 'super-app-theme--header',

      renderCell: (params) =>
        <Link href={`/coindetails/${params.row.id}`}>{params.row.id}</Link>,
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 110,
      editable: true,
      sortable: true
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      headerClassName: 'super-app-theme--header',
      width: 110,
      editable: true,
    },
    {
      field: 'supply',
      headerName: 'Supply',
      headerClassName: 'super-app-theme--header',
      width: 120,
      editable: true,
    },
    {
      field: 'marketCapUsd',
      headerName: 'Market Cap (USD)',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      sortable: true,
      width: 160,
    },
    {
      field: 'priceUsd',
      headerName: 'Price (USD)',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      // sortable: false,
      width: 160,
    },
    {
      field: 'changePercent24Hr',
      headerName: 'Change Percent in 24Hr (%)',
      headerClassName: 'super-app-theme--header',
      width: 170,
      renderCell: (params) => {
        return (
          params.value < 0 ?
            (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowDownwardIcon fontSize="small" sx={{ color: 'red', mr: 1, }} />
                <Typography >{Math.abs(params.value).toFixed(2)}%</Typography>
              </Box>)
            :
            (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpwardIcon fontSize="small" sx={{ color: green[500], mr: 1 }} />
                <Typography >{Math.abs(params.value).toFixed(2)}%</Typography>
              </Box>)
        )
      },
    },

    {
      field: 'volumeUsd24Hr',
      headerName: 'Volume in 24Hr (USD)',
      headerClassName: 'super-app-theme--header',
      type: 'number',
      // sortable: false,
      width: 167,
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
      <Typography variant="h4" textAlign={'center'} sx={{ textAlign: 'center', my: 4, fontWeight: 'bold' }}>Home Page</Typography>
      <Container>
        {data ?
          <Box
            sx={{
              height: 400,
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: 'gray',
              }, backgroundColor: '#ff943975'
            }}
          >
            <DataGrid
              columns={columns}
              rows={rows as string[]}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
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
          : <div style={{ textAlign: 'center' }}>
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
      </Container>

    </div>
  );
}
