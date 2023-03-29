import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { getEvent, updateEvent } from './Services';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpajEiLCJhIjoiY2xmbXIwZjlpMDA1MDNyb2RvZm5hMTVkZiJ9.wl_CAK8ETNt5oTYJFR0c8A';

function UpdateEvent() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [image, setImage] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const event = await getEvent(id);
      setEventData(event);
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setPlaceName(event.location.placeName);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (mapContainer.current && eventData) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: eventData.location.coordinates,
        zoom: 15,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      map.current.addControl(geocoder);

      const marker = new mapboxgl.Marker().setLngLat(eventData.location.coordinates).addTo(map.current);

      map.current.on('move', () => {
        marker.setLngLat(map.current.getCenter());
      });
    }
  }, [eventData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      description,
      date,
      location: {
        placeName,
        coordinates: [map.current.getCenter().lng, map.current.getCenter().lat],
      },
      image,
    };
    await updateEvent(id, updatedEvent);
    // Redirect to the event page
  };
  
  
  return (
    <Container>
    <h1>Update Event</h1>
    {eventData ? (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    </Form.Group>
    <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
    </Form.Group>
    <Form.Group controlId="date">
    <Form.Label>Date</Form.Label>
    <Form.Control type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
    </Form.Group>
    <Form.Group controlId="location">
    <Form.Label>Location</Form.Label>
    <div ref={mapContainer} style={{ height: '300px' }} />
    <Form.Control type="text" placeholder="Enter location" value={placeName} onChange={(event) => setPlaceName(event.target.value)} required />
    </Form.Group>
    <Form.Group controlId="image">
    <Form.Label>Image</Form.Label>
    <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setImage(e.target.files[0])} />
    </Form.Group>
    <Button variant="primary" type="submit">
    Update
    </Button>
    </Form>
    ) : (
    <p>Loading...</p>
    )}
    </Container>
    );
    }
  
export default UpdateEvent;