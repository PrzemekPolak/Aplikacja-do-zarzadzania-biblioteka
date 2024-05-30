import { useState } from "react";
import { useEffectNoInitial } from "../../../../shared/hooks/useEffectNoInitial";
import { ISearchBarProps } from "./SearchBar.model";
import { StyledTextField } from "./SearchBar.style";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ name, setCurrentSearch, label }: ISearchBarProps) => {
  const [currentValue, setCurrentValue] = useState<null | string>(null);
  var timer: ReturnType<typeof setTimeout>;

  const setValueInstantly = () => {
    clearTimeout(timer);
    setCurrentSearch({ name: name, payload: currentValue });
  };

  useEffectNoInitial(() => {
    timer = setTimeout(() => {
      setCurrentSearch({ name: name, payload: currentValue });
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentValue]);

  return (
    <>
      <StyledTextField
        label={label}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.keyCode == 13) setValueInstantly();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={setValueInstantly}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export { SearchBar };
