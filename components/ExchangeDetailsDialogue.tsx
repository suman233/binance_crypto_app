import { axiosInstance } from "@/api/axiosinstance";
import { endPoints } from "@/api/endpoints";
import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exchangeID: string;
};

const ExchangeDetailsDialogue = ({ open, setOpen, exchangeID }: props) => {
  const { data: singleexchange } = useQuery({
    queryKey: ["singledetails", exchangeID],
    queryFn: async () => {
      const data = await axiosInstance.get(
        endPoints.fetchedexchange.exchangedetails(`${exchangeID}`)
      );
      console.log(data);
      return data?.data.data;
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {singleexchange ? singleexchange.name : ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ExchangeDetailsDialogue;
