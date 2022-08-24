import React, { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { BorrowAdditionalContext } from "@/components/eadmin/policy/context/borrowAdditional";
import { useFormikContext } from "formik";
import { rmApi } from "@/__api__/rm/rmApi";
import ShowErrorCode from "@/components/qlhs/utils/showError";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectCoverNumber({ handleSubmit }) {
  const theme = useTheme();
  const [coverOfNum, setCoverOfNum] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState(false);

  const { values, setFieldValue, handleChange } = useFormikContext();

  const fetchApi = async () => {
    const res = await rmApi.getCoverNumOfRmcard();
    if (res.status == 200) {
      setCoverOfNum(res.items);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const { setAttachedCover, setOpenModal, setRmCard } = useContext(BorrowAdditionalContext);

  const handleAttachedCover = () => {
    setAttachedCover(values.numOfCover);
    setOpenModal(false);
    setRmCard(false);
    // setSubmitSuccess(true);
    handleSubmit(values);
  };

  const fetchNewCoverNumber = async () => {
    const res = await rmApi.getNewCoverOfRmcard();
    if (res.status == 200) {
      setCoverOfNum(res.items);
      const covers = res.items;
      const newCover = covers[covers.length - 1].numOfCover;
      setFieldValue("numOfCover", newCover);
    }
  };

  const createNumOfCover = () => {
    fetchNewCoverNumber();
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Số bìa</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name="numOfCover"
          value={values.numOfCover}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Số bìa" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip key={selected} label={selected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {coverOfNum?.map((cover) => (
            <MenuItem key={cover.id} value={cover.numOfCover}>
              {cover.numOfCover}
            </MenuItem>
          ))}
          <MenuItem>
            <Button onClick={createNumOfCover}>Tạo mới</Button>
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="vib"
        sx={{ float: "right", mr: "26px" }}
        onClick={handleAttachedCover}
      >
        Gán số bìa
      </Button>
      {error && <ShowErrorCode />}
    </div>
  );
}
