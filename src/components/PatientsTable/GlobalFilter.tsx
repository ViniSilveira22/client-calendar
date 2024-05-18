import React from "react";
import { useAsyncDebounce, useGlobalFilter, useTable } from "react-table";

interface GlobalFilterProps {
  preGlobalFilteredRows: any[];
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
};

export default GlobalFilter;
