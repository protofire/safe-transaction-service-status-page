import { SyntheticEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  defaultOptions,
  defaultOptionsPRD,
  defaultOptionsSTG,
} from "./default-options";

type ConfigServiceUrlSelectorProps = {
  configServiceUrl?: string[];
  setConfigServiceUrl: React.Dispatch<React.SetStateAction<string[]>>;
};

type optionsType = {
  label: string;
  value: string;
};

// enable filter by label and value
const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option: optionsType) => `${option.label} ${option.value}`,
  trim: true,
});

function ConfigServiceUrlSelector({
  configServiceUrl = [],
  setConfigServiceUrl,
}: ConfigServiceUrlSelectorProps) {
  const [inputValue, setInputValue] = useState<string>("");

  // Select config by search param set in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryValue = searchParams.get("config") || "";
    if (queryValue) {
      setConfigServiceUrl([queryValue]);
      setInputValue(queryValue);
    }
  }, []);

  // Combine all options including All PRD and All STG
  const combinedOptions = [
    { label: "All PRD", value: "PRD" },
    { label: "All STG", value: "STG" },
    ...defaultOptions,
  ];

  // Set default value to PRD options on mount
  useEffect(() => {
    if (configServiceUrl.length === 0) {
      setConfigServiceUrl(defaultOptionsPRD.map((opt) => opt.value));
      setInputValue("All PRD");
    }
  }, [setConfigServiceUrl, configServiceUrl]);

  return (
    <Box maxWidth={320} marginTop={4} marginBottom={2} component={Paper}>
      <Autocomplete
        id="config-service-url-input"
        freeSolo
        // Config Service value
        value={inputValue}
        onChange={(
          event: SyntheticEvent,
          option: string | optionsType | null
        ) => {
          const isStringValue = typeof option === "string";
          const newValue = isStringValue ? option : option?.value;

          if (newValue === "PRD") {
            setConfigServiceUrl(defaultOptionsPRD.map((opt) => opt.value));
            setInputValue("All PRD");
          } else if (newValue === "STG") {
            setConfigServiceUrl(defaultOptionsSTG.map((opt) => opt.value));
            setInputValue("All STG");
          } else if (newValue) {
            setConfigServiceUrl([newValue]);
            setInputValue(newValue);
          } else {
            setConfigServiceUrl([]);
            setInputValue("");
          }
        }}
        // input value
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Config Service Url"
            InputLabelProps={{ shrink: true }}
          />
        )}
        // options
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.value
        }
        options={combinedOptions}
        renderOption={(props, option) => (
          <ListItem {...props}>
            <ListItemText primary={option.label} secondary={option.value} />
          </ListItem>
        )}
      />
    </Box>
  );
}

export default ConfigServiceUrlSelector;
