import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";
import { useMemo } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

interface Selecter {
  handleChange: (e : string) => void,
  options: string[],
  interval : string
}
function SelectInterval({interval, handleChange} : Selecter) {
 
   const options = useMemo(
     () => ["m1", "m5", "m15", "m30", "h1 ", "h2", "h6", "h12", "d1"],
     []
   );

   const handleInterval = (e : SelectChangeEvent) => {
     handleChange(e.target.value)
   }
  
  return (
    
    <Container>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Set Interval</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={interval}
              label="Set Interval"
              onChange={handleInterval}
            >
            {
                options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>{option}</MenuItem>
                ))
            }
            </Select>
          </FormControl>
        </Box>
    </Container>
)}

export default React.memo(SelectInterval, (prevProps, postProps) => prevProps.interval === postProps.interval)