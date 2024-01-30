import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddMembers = ({ members, setMembers, users }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setMembers([...members, ...value]);
    console.log(members);
  };

  return (
    <div>
      <Typography fontSize={18} fontWeight="bold" mb={1}>
        Add Members
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="user-name">Member Name</InputLabel>
        <Select
          labelId="user-name"
          id="user-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Member Name" />}
          MenuProps={MenuProps}
        >
          {users.map((item, ind) => (
            <MenuItem
              key={ind}
              value={item?._id}
              style={getStyles(item?.name, personName, theme)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddMembers;
