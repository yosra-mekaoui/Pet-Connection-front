import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { addEvent } from './Services';
import { Container, Form, Button } from 'react-bootstrap';
import "./style.css"

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpajEiLCJhIjoiY2xmbXIwZjlpMDA1MDNyb2RvZm5hMTVkZiJ9.wl_CAK8ETNt5oTYJFR0c8A';

function CreateEvent() {
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);
  const id = JSON.parse(localStorage.getItem('user'))._id || JSON.parse(localStorage.getItem('user')).facebookId;

  useEffect(() => {
    const mapObj = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 14,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    mapObj.addControl(geolocateControl);
    mapObj.addControl(geocoder);

    setMap(mapObj);

    geocoder.on('result', (event) => {
      setLocation(event.result.geometry.coordinates);
      setPlaceName(event.result.place_name);

      if (marker) {
        marker.remove();
      }

      const newMarker = new mapboxgl.Marker()
        .setLngLat(event.result.geometry.coordinates)
        .addTo(mapObj);

      setMarker(newMarker);
    });

    geolocateControl.on('geolocate', (event) => {
      handleGeolocation(event.coords.latitude, event.coords.longitude);
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleGeolocation(position);
      },
      (error) => {
        console.error(error);
        mapObj.setCenter([-74.5, 40]);
      }
    );
    
  }, []);


  function handleGeolocation(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    setLocation([longitude, latitude]);
    setPlaceName('Your Location');
  
    if (marker) {
      marker.remove();
    }
  
    const newMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  
    setMarker(newMarker);
    map.setCenter([longitude, latitude]);
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!location) {
      alert('Please select a location for the event');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('organizer', id);
      formData.append('location', JSON.stringify(location));
      formData.append('placeName', placeName);
      if (image) {
        formData.append('image', image);
      }

      const response = await addEvent(formData);
      console.log(response.data);
      alert('Event created successfully');
      setLocation(null);
      setTitle('');
      setDescription('');
      setDate('');
      setImage(null);
      if (marker) {
        marker.remove();
      }
      setMarker(null);
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };



  return (
    <Container className="form-container">
      <h1 className="form-title">Create Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control className="form-input" type="text" placeholder="Enter title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={
            3
          }
            placeholder="Enter description" value={description} onChange={(event) => setDescription(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Enter date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="formImage">

          <Form.Label>Image</Form.Label>
          <Form.Control type="file" placeholder="Enter image" onChange={(event) => setImage(event.target.files[0])} />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" value={placeName} onChange={(event) => setPlaceName(event.target.value)} />
        </Form.Group>
        <div id="map" style={{ height: '400px' }}></div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>

  );
}
export default CreateEvent;
