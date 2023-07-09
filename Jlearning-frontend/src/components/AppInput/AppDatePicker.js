import { Button, Input, List, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import React from "react";
const AppDatePicker = ({ value, title, handleChangeValue, placeholder }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const years = [];
    for (let x = 2020; x >= 1950; x--) {
        years.push(x);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return <div className="w-full">

        <Button
            onClick={handleClick}
            sx={{ fontStyle: "normal" }}
            color='info' variant="contained" className=' w-full' >
            {value ? "Năm sinh: " + value : "Chọn năm sinh"}
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            className="w-full"
        >
            <List className="w-[355px] overflow-auto h-[200px]">
                {years.map((year) => {
                    return <ListItemButton
                        onClick={() => {
                            handleChangeValue(title, year);
                            handleClose();
                        }}
                    // selected={}
                    // onClick={}
                    >

                        <ListItemText primary={year} />
                    </ListItemButton>
                })
                }

            </List>
        </Popover>
    </div>
}

export default AppDatePicker;