import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Dialog, TextField, Table, 
  TableBody, TableCell, TableHead, TableRow, Paper, TableContainer,
  DialogActions, DialogContent, DialogTitle, Container, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});


function ShoppingList() {
    const [items, setItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [currentItem, setCurrentItem] = useState(null);  // The item currently being updated
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newItemCategory, setNewItemCategory] = useState('');




    useEffect(() => {
        fetch('http://localhost:8000/lists/api/items/')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);


    const handleAdd = () => {
        fetch('http://localhost:8000/lists/api/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newItemName }),
        })
        .then(response => response.json())
        .then(data => {
            setItems([...items, data]);
            setOpenDialog(false);
        })
        .catch(error => console.error(error));
    };

    const handleUpdate = (itemId) => {
      const itemToEdit = items.find(item => item.id === itemId);
      setCurrentItem(itemToEdit);
      setUpdateDialogOpen(true);
    };
  
    const submitUpdate = () => {
      fetch(`http://localhost:8000/lists/api/items/${currentItem.id}/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentItem),
      })
      .then(response => response.json())
      .then(data => {
          setItems(prevItems => {
              const otherItems = prevItems.filter(item => item.id !== data.id);
              return [...otherItems, data];
          });
          setUpdateDialogOpen(false);
      });
    };
  
    const handleDelete = (itemId) => {
      fetch(`http://localhost:8000/lists/api/items/${itemId}/`, {
          method: 'DELETE',
      })
      .then(() => {
          setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      });
    };
  
    return (
      <ThemeProvider theme={theme}>
          <div>
              <AppBar position="static">
                  <Toolbar>
                      <Typography variant="h6">
                          Shopping List App
                      </Typography>
                  </Toolbar>
              </AppBar>
              
              <Container>
                  <Typography variant="h4" style={{ marginTop: '20px', marginBottom: '20px' }}>
                      Shopping List
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                      Add Item
                  </Button>
                  <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>Item</TableCell>
                                  <TableCell>Category</TableCell>
                                  <TableCell>Actions</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {items.map(item => (
                                  <TableRow key={item.id}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.category.name}</TableCell>
                                      <TableCell>
                                          <Button variant="outlined" color="primary" onClick={() => handleUpdate(item.id)}>
                                              Update
                                          </Button>
                                          <Button variant="outlined" color="secondary" onClick={() => handleDelete(item.id)}>
                                              Delete
                                          </Button>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  {/* Dialog for adding items */}
                  <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogContent>
                        <TextField 
                            fullWidth
                            label="Item Name" 
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                        {/* Added a dropdown to select category for the new item */}
                        <Select
                            fullWidth
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                        >
                            {/* For now, hard-coded categories */}
                            <MenuItem value="Fruits">Fruits</MenuItem>
                            <MenuItem value="Vegetables">Vegetables</MenuItem>
                            <MenuItem value="Meat">Meat</MenuItem>
                            {/* Add other categories as needed */}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Add
                        </Button>
                        <Button variant="contained" onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                    <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
                        <DialogTitle>Update Item</DialogTitle>
                        <DialogContent>
                            <TextField 
                                label="Item Name" 
                                value={currentItem?.name || ''}
                                onChange={(e) => setCurrentItem(prev => ({...prev, name: e.target.value}))}
                            />
                            <Autocomplete
                                value={currentItem?.category}
                                onChange={(event, newValue) => {
                                    setCurrentItem(prev => ({ ...prev, category: newValue }));
                                }}
                                options={categories}  // This should be fetched from your backend. For now, we assume a hardcoded list.
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Category" />}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={submitUpdate}>Confirm</Button>
                            <Button variant="contained" color="default" onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

              </Container>
          </div>
        </ThemeProvider>
    );
}

export default ShoppingList;
