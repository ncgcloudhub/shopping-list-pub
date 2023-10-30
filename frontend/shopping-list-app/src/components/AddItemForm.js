import React, { useState } from 'react';

function AddItemForm() {
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you'd make an API call to add the item
        console.log("Item to add:", itemName, itemCategory);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Category" 
                value={itemCategory} 
                onChange={(e) => setItemCategory(e.target.value)} 
            />
            <button type="submit">Add Item</button>
        </form>
    );
}

export default AddItemForm;
