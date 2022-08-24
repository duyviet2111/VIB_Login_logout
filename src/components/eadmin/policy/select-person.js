import React, { useState } from "react";

import { styled } from "@mui/material/styles";

import { Avatar, TextField, Chip, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const MAX_NUMBER_OF_SELECTION = 3;

// const filter = createFilterOptions();

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&": {
    paddingLeft: 0,
    paddingRight: 0,
  },

  "& .MuiListItemText-primary": {
    fontSize: theme.typography.subtitle1.fontSize,
  },
  "& .MuiListItemText-secondary": {
    fontSize: theme.typography.subtitle2.fontSize * 0.5,
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  margin: "auto",
  "& li.MuiAutocomplete-option": {
    paddingLeft: 0,
    paddingRight: 0,
  },

  "& .MuiListItem-root": {
    borderBottom: "1px dashed #ddd",
  },
}));

/**
 * Các settings chung của selectbox
 */
export const commonSearchSettings = {
  autoHighlight: true,
  closeText: "Close all",
  disableListWrap: true,
  fullWidth: true,
  filterSelectedOptions: true,
  limitTags: 3,
  multiple: true,
  noOptionsText: "No options",
  renderOption: (props, option, { inputValue }) => {
    const matches = match(option.label, inputValue);
    const parts = parse(option.label, matches);

    const { value, avatar, label, title } = option;

    return (
      <StyledListItem key={value} {...props}>
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText primary={label} secondary={title} />
      </StyledListItem>
    );
  },
};

const PersonSelector = (props) => {
  const { placeholder, options: searchOptions, error, helperText } = props;
  const [selections, setSelection] = useState(props.currentSelections);
  const onChangeHandler = (_, inputValue, reason) => {
    if (props.onChange) {
      props.onChange(inputValue);
    }
    setSelection(inputValue);
    console.log("Search changed", inputValue, reason);
  };

  return (
    <StyledAutocomplete
      {...commonSearchSettings}
      freeSolo={selections?.length <= MAX_NUMBER_OF_SELECTION}
      defaultValue={props.currentSelections}
      style={{ width: "15rem" }}
      className="search-box-mui"
      getOptionDisabled={() =>
        // cấm không cho input quá `MAX_NUMBER_OF_SELECTION` tìm kiếm
        selections.length >= MAX_NUMBER_OF_SELECTION
      }
      options={searchOptions}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={option.email}
            className="search-box-chip"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          className="search-box-input"
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputLabelProps={{
            shrink: false,
          }}
        />
      )}
      onChange={onChangeHandler}
      onOpen={(event) => {
        if (props.onOpen) {
          props.onOpen();
        }
      }}
    />
  );
};

export default PersonSelector;
