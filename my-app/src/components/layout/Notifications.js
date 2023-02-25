import React from "react";

// component
import MyButton from "../../util/myButton";

// mui
import { MenuItem, Menu, Badge } from "@mui/material";

// mui icons
import {
    Notifications as NotificationsIcon,
} from "@mui/icons-material";

const Notifications = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MyButton
                tip="Notifications"
                content={
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                }
                color="inherit"
                onClick={handleOpen}
            />
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    You have no notifications yet
                </MenuItem>
            </Menu>
        </>
    );
};

export default Notifications;
