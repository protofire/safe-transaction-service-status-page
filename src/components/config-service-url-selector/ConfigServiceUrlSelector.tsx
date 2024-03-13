import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// const { REACT_APP_CONFIG_SERVICE_URL } = process.env;

const defaultOptions = [
  {
    label: "Astar PRD",
    value: "https://config.safe.astar.network",
  },
  {
    label: "Astar STG",
    value: "https://config.staging-safe.astar.network",
  },
  {
    label: "Berachain PRD",
    value: "https://config.safe.berachain.com",
  },
  {
    label: "Berachain STG",
    value: "https://config.staging.safe.berachain.com",
  },
  {
    label: "Blast STG",
    value: "https://config.blast-safe.io/",
  },
  {
    label: "Evmos PRD",
    value: "https://config.safe.evmos.org",
  },
  {
    label: "Evmos STG",
    value: "https://config.safe.evmos.dev",
  },
  {
    label: "Harmony PRD",
    value: "https://config.multisig.harmony.one",
  },
  {
    label: "Harmony STG",
    value: "https://config.staging-safe.harmony.one",
  },
  {
    label: "Holesky PRD",
    value: "https://config.holesky-safe.protofire.io",
  },
  {
    label: "Holesky STG",
    value: "https://config.stg.holesky-safe.protofire.io",
  },
  {
    label: "Immutable PRD",
    value: "https://config.safe.immutable.com",
  },
  {
    label: "Immutable STG",
    value: "https://config.safe.staging.immutable.com",
  },
  {
    label: "Kroma PRD",
    value: "https://config.safe.kroma.network",
  },
  {
    label: "Kroma STG",
    value: "https://config.staging.safe.kroma.network",
  },
  {
    label: "Linea PRD",
    value: "https://config.safe.linea.build",
  },
  {
    label: "Linea STG",
    value: "https://config.staging.safe.linea.build",
  },
  {
    label: "Mantle PRD",
    value: "https://config.multisig.mantle.xyz",
  },
  {
    label: "Mantle STG",
    value: "https://config.staging.multisig.mantle.xyz",
  },
  {
    label: "Moonbeam PRD",
    value: "https://config.multisig.moonbeam.network",
  },
  {
    label: "Moonbeam STG",
    value: "https://config.staging.multisig.moonbeam.network",
  },
  {
    label: "NeonEVM PRD",
    value: "https://config.safe.neonevm.org",
  },
  {
    label: "NeonEVM STG",
    value: "https://config.staging.safe.neonevm.org",
  },
  {
    label: "Oasis PRD",
    value: "https://config.safe.oasis.io",
  },
  {
    label: "Oasis STG",
    value: "https://config.safe.stg.oasis.io",
  },
  {
    label: "Rootstock PRD",
    value: "https://config.safe.rootstock.io",
  },
  {
    label: "Rootstock STG",
    value: "https://config.staging.safe.rootstock.io",
  },
  {
    label: "Scroll PRD",
    value: "https://config.safe.scroll.xyz",
  },
  {
    label: "Scroll STG",
    value: "https://config.staging.safe.scroll.xyz",
  },
  {
    label: "Sei PRD",
    value: "https://config.sei-safe.protofire.io",
  },
  {
    label: "Sei STG",
    value: "https://config.staging.sei-safe.protofire.io",
  },
  {
    label: "Superchain PRD",
    value: "https://config.safe.optimism.io",
  },
  {
    label: "Superchain STG",
    value: "https://config.staging.safe.optimism.io",
  },
  {
    label: "Taiko PRD",
    value: "https://config.safe.taiko.xyz",
  },
  {
    label: "Taiko STG",
    value: "https://config.staging.safe.taiko.xyz",
  },
  {
    label: "Tangible STG",
    value: "https://config.staging.safe.re.al",
  },
  {
    label: "Wemix PRD",
    value: "https://config.safe.wemix.com",
  },
  {
    label: "Wemix STG",
    value: "https://config.staging.safe.wemix.com",
  },
  {
    label: "ZetaChain PRD",
    value: "https://config.safe.zetachain.com",
  },
  {
    label: "ZetaChain STG",
    value: "https://config.staging.safe.zetachain.com",
  },
];

type ConfigServiceUrlSelectorProps = {
  configServiceUrl?: string;
  setConfigServiceUrl: React.Dispatch<React.SetStateAction<string>>;
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
  configServiceUrl,
  setConfigServiceUrl,
}: ConfigServiceUrlSelectorProps) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Box maxWidth={320} marginTop={4} marginBottom={2} component={Paper}>
      <Autocomplete
        id="config-service-url-input"
        freeSolo
        // Config Service value
        value={configServiceUrl}
        onChange={(
          event: SyntheticEvent,
          option: string | optionsType | null
        ) => {
          const isStringValue = typeof option === "string";
          const newValue = isStringValue ? option : option?.value;
          setConfigServiceUrl(newValue || "");
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
        options={defaultOptions}
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
