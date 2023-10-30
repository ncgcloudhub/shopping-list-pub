import React from 'react';

function ListItem({ item }) {
    return (
        <div className="list-item">
            <p>{item.name} - {item.category}</p>
        </div>
    );
}

export default ListItem;
