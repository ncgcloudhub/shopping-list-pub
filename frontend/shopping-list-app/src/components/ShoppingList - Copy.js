import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import './ShoppingList.css';




function ShoppingList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/lists/api/items/')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    return (
        <div 
            sx={{
                maxWidth: 600,
                margin: 'auto',
                marginTop: 50,
                backgroundColor: theme => theme.palette.background.paper,
                borderRadius: 10
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{
                    textAlign: 'center',
                    marginBottom: 20
                }}
            >
                Shopping List
            </Typography>
            <List>
                {items.map(item => (
                    // Using the MUI ListItem component, but you can replace this with your custom ListItemComponent if needed
                    <ListItem 
                        key={item.id} 
                        sx={{
                            borderBottom: `1px solid ${theme => theme.palette.divider}`
                        }}
                    >
                        <ListItemText primary={item.name} secondary={item.category.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ShoppingList;

