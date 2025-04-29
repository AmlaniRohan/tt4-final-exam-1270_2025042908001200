import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

// Update this URL if your backend is running on a different port
const apiUrl = 'http://localhost:5058/api/TravelEntries';

function TravelEntryForm() {
  const [entry, setEntry] = useState({
    location: '',
    date: '',
    description: '',
    photos: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${apiUrl}/${id}`)
        .then(response => {
          const entryData = response.data;
          // Format the date to YYYY-MM-DD if it includes time
          if (entryData.date) {
            entryData.date = entryData.date.split('T')[0];
          }
          setEntry(entryData);
        })
        .catch(error => console.error('Error fetching entry:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`${apiUrl}/${id}`, entry)
      : axios.post(apiUrl, entry);

    request
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving entry:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="location" className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={entry.location}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="date" className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={entry.date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={entry.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="photos" className="mb-3">
        <Form.Label>Photos URL</Form.Label>
        <Form.Control
          type="text"
          name="photos"
          value={entry.photos}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {id ? 'Update Entry' : 'Add Entry'}
      </Button>
    </Form>
  );
}

export default TravelEntryForm;
