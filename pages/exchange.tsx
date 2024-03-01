import { axiosInstance } from "@/api/axiosinstance";
import { endPoints } from "@/api/endpoints";
import { getExchangeDetails } from "@/api/functions";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useState, lazy } from "react";
import { useQuery } from "react-query";
import styles from "@/styles/exchange.module.css";
import ExchangeDetailsDialogue from "@/components/ExchangeDetailsDialogue";

// const ExchangeDetailsDialogue = lazy(
//   () => import("@/components/ExchangeDetailsDialogue")
// );

const exchange = () => {
  const [showModal, setShowModal] = useState(false);
  const [exchangeID, setExchangeID] = useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["allexchange"],
    queryFn: getExchangeDetails,
  });
  if (isLoading)
    return (
      <div>
        <Typography variant="h2" my={5}>
          Loading...
        </Typography>
      </div>
    );

  const columns: GridColDef[] = [
    {
      field: "rank",
      headerName: "Rank",
      width: 160,
      editable: true,
      sortable: true,
    },
    {
      field: "exchangeId",
      headerName: "ID",
      width: 160,
      renderCell: (params) => (
        <Link href={`exchangedetails/${params.row.exchangeId}`}>
          {params.row.exchangeId}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
      editable: true,
      sortable: true,
    },
    {
      field: "percentTotalVolume",
      headerName: "Total Volume (%)",
      width: 160,
      editable: true,
    },
    {
      field: "volumeUsd",
      headerName: "Volume (USD)",
      width: 160,
      editable: true,
    },
    {
      field: "tradingPairs",
      headerName: "Trading Pairs",
      width: 160,
      editable: true,
    },
    {
      field: "exchangeUrl",
      headerName: "Exchange Url",
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Link href={`${params.row.exchangeUrl}`}>{params.row.exchangeUrl}</Link>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <Button
          onClick={() => {
            setShowModal(true);
            setExchangeID(row.exchangeId);
          }}
        >
          {/* <Link
            style={{ textDecoration: "none" }}
            href={`exchangedetails/${row.exchangeId}`}
          > */}
          Show
          {/* </Link> */}
        </Button>
      ),
    },
  ];

  const rows = data?.map((item: any, index: number) => {
    item["index"] = index;
    return item;
  });

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Exchange Page
      </Typography>
      {data ? (
        <Container>
          <Box
            sx={{ height: 400, width: "100%", backgroundColor: "#ff943975" }}
          >
            <DataGrid
              columns={columns}
              rows={rows as string[]}
              getRowId={(row) => row.exchangeId}
              // onRowClick={(row) =>handleRowClick(row?.exchangeId)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 15, 25]}
            />
          </Box>
        </Container>
      ) : null}
      <ExchangeDetailsDialogue
        open={showModal}
        setOpen={setShowModal}
        exchangeID={exchangeID}
      />
    </div>
  );
};

export default exchange;
