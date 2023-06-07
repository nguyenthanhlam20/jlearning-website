import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AppSelect = ({ title, display, display2, data, value, placeholder,handleChangeValue }) => {

  // console.log("datd: ", data);
  return <>
    <FormControl fullWidth>
      <InputLabel sx={{ p: 0, m: 0 }} id="demo-simple-select-label">{placeholder}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={placeholder}
        value={value}
        onChange={(e) => handleChangeValue(title, e.target.value)}
      >
        {data?.map((item, key) => {
          return <MenuItem   key={key} value={item[title]}>{item[display]}{display2 ? ': ' + item[display2] : ''}</MenuItem>
        })}

      </Select>
    </FormControl>

  </>
}

export default AppSelect;