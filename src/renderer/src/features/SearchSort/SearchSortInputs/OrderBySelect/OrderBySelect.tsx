import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  IOrderBySelectProps,
  ORDER_OPTIONS,
  TOrderOptions,
  TPossibleOptions,
} from "./OrderBySelect.model";
import { useEffect, useState } from "react";

const OrderBySelect = ({
  name,
  orderOptions,
  setOrderType,
  initialValue = ORDER_OPTIONS.ID,
}: IOrderBySelectProps) => {
  const [currentValue, setCurrentValue] = useState<TOrderOptions>(initialValue);
  const possibleOptionsLabels: TPossibleOptions = {
    ID: "Identyfikator",
    TITLE: "Tytuł",
    BORROWED_DATE: "Data wypożyczenia",
    RETURNED_DATE: "Data oddania",
    USER_SURNAME: "Nazwisko użytkownika"
  };
  useEffect(() => {
    setOrderType({ name: name, payload: currentValue });
  }, [currentValue]);

  return (
    <FormControl variant="outlined" sx={{ width: "100%" }}>
      <InputLabel>Sortuj po</InputLabel>
      <Select
        value={currentValue}
        onChange={(event) =>
          setCurrentValue(event.target.value as TOrderOptions)
        }
        label="Sortuj po"
      >
        {orderOptions.map((el) => {
          return (
            <MenuItem value={el} key={el}>
              {possibleOptionsLabels[el]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { OrderBySelect };
