import React from 'react';
import axios from 'axios';

class ItemList extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    axios.get('/api/items/')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ItemList;