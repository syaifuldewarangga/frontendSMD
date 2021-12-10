import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { 
    Collapse, 
    Divider, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText 
} from '@mui/material'

import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

function AppMenuItem(props) {
    const { name, link, Icon, items } = props
    const isExpandable = items && items.length > 0
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const MenuItemRoot = () => {
        return (
            <ListItemButton onClick={handleClick} component={Link} to={`${!link ? '#' : link }`}  >
                { !!Icon &&
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                }
                <ListItemText primary={name} inset={!Icon}/>
                {isExpandable && !open && <ExpandMore />}
                {isExpandable && open && <ExpandLess />}
            </ListItemButton>
        )
    }
    
    const MenuItemChildren = () => {
        return isExpandable ? (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    {
                        items.map((item, index) => (
                            <AppMenuItem {...item} key={index} />
                        ))
                    }
                </List>
            </Collapse> 
        ) : null
    }

    return (
        <Fragment>
            <MenuItemRoot />
            <MenuItemChildren />
        </Fragment>
    )
}

export default AppMenuItem
