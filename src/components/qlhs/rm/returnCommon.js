import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormGroup,
  Switch,
} from "@mui/material";
import { QlhsCreateForm } from "@/components/qlhs/qlhs-create-form";
import ExtendPage from "./extend";
import BrmoreStep1 from "./brmore-step1";
import ExtendDateConfirm from "./extend-date-confirm";
import { ReturnForm } from "./returnRecord";
import { useFormikContext } from "formik";
import { ReturnAndExtendContext } from "./context/returnAndExtend";
import { BorrowAdditionalContext } from "@/components/eadmin/policy/context/borrowAdditional";

const ReturnCommon = ({ setExtend }) => {
  const [checked, setChecked] = useState();
  const [returnValue, setReturnValue] = useState([]);

  const {
    initialValues,
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormikContext();

  const { setSelected, selected } = useContext(ReturnAndExtendContext);
  const { selectedRecord, setRmCard } = useContext(BorrowAdditionalContext);

  const handleRadioGroupChange = (e) => {
    setChecked(e.target.value);
    setSelected(e.target.value);
  };

  useEffect(() => {
    setFieldValue("record", selectedRecord);
  }, []);

  useEffect(() => {
    if (checked == "Gia hạn") {
      setExtend(true);
      setValues({ record: values.record, extend: values.extend, approveForm: values.approveForm });
    }
    if (checked == "Hoàn trả") {
      setExtend(false);
      setValues({ record: values.record, formGroup: values.formGroup, numOfCover: "" });
    }
  }, [checked]);

  // const handleToggleRMCard = (e) => {
  //   setRmCard(e.target.checked);
  // };

  return (
    <Grid container sx={{ flexDirection: "column", my: 4, px: 4 }}>
      <Grid container justifyContent="space-between" spacing={3} alignItems="center">
        <Grid>
          <Typography variant="h4">Hoàn trả và Gia hạn</Typography>
          <Typography variant="body2">{`hoàn trả và gia hạn_${selectedRecord.fullname}_HĐTD ${selectedRecord.contractNo}`}</Typography>
        </Grid>
        {/* <FormGroup>
          <FormControlLabel control={<Switch onChange={handleToggleRMCard} />} label="RM card" />
        </FormGroup> */}
      </Grid>
      <Grid sx={{ justifyContent: "center", display: "flex" }}>
        <FormControl sx={{ flexDirection: "row", width: "80%", justifyContent: "space-between" }}>
          <FormLabel
            id="demo-radio-buttons-group-label"
            component="div"
            sx={{ width: "200px", height: "84px", lineHeight: "84px" }}
          >
            Bạn muốn thực hiện
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}
            onChange={handleRadioGroupChange}
            value={selected}
          >
            <FormControlLabel value="Hoàn trả" control={<Radio />} label="Hoàn trả" />
            <FormControlLabel value="Gia hạn" control={<Radio />} label="Gia hạn" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {selected == "Hoàn trả" && <QlhsCreateForm checked={checked} returnValue={returnValue} />}
      {selected == "Gia hạn" && <ExtendDateConfirm checked={checked} />}
    </Grid>
  );
};

export default ReturnCommon;
