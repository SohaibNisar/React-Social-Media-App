import React from 'react'

// mui
import { Tooltip, IconButton } from '@mui/material';

const myButton = ({ content, tip, onClick, color, className, size, sx }) => {
    return (
        <Tooltip title={tip} arrow>
            <IconButton size={size} sx={sx} onClick={onClick} color={color} className={className}>
                {content}
            </IconButton>
        </Tooltip>
    )
}

export default myButton;