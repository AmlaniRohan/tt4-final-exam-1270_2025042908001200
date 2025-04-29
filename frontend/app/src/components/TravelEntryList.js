import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const apiUrl = 'http://localhost:5058/api/TravelEntries';

function TravelEntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setEntries(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => setEntries(entries.filter(entry => entry.id !== id)))
      .catch(error => console.error('Error deleting entry:', error));
  };

  return (
    <div>
      <Link to="/add">
        <Button variant="primary" className="mb-3">Add New Entry</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.location}</td>
              <td>{entry.date}</td>
              <td>{entry.description}</td>
              <td><a href={entry.photos} target="_blank" rel="noopener noreferrer">View</a></td>
              <td>
                <Link to={`/edit/${entry.id}`}>
                  <Button variant="warning" size="sm" className="me-2">Edit</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(entry.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TravelEntryList;
