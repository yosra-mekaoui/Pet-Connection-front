import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { getEvent, updateEvent } from './Services';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpajEiLCJhIjoiY2xmbXIwZjlpMDA1MDNyb2RvZm5hMTVkZiJ9.wl_CAK8ETNt5oTYJFR0c8A';

function UpdateEvent() {
const { id } = useParams();
const [eventData, setEventData] = useState(null);
const [location, setLocation] = useState(null);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [date, setDate] = useState('');
const [image, setImage] = useState(null);
const [placeName, setPlaceName] = useState('');
const [marker, setMarker] = useState(null);
const [map, setMap] = useState(null);

useEffect(() => {
async function fetchEventData() {
const event = await getEvent(id);
setEventData(event);
setTitle(event.title);
setDescription(event.description);
setDate(event.date);
setImage(event.image);
setLocation(event.location.coordinates);
setPlaceName(event.location.place_name);


  const mapObj = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 14,
    center: event.location.coordinates,
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

    const newMarker = new mapboxgl.Marker().setLngLat(event.result.geometry.coordinates).addTo(mapObj);

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
}

fetchEventData();
}, [id]);

function handleGeolocation(position) {
const longitude = position.coords.longitude;
const latitude = position.coords.latitude;
setLocation([longitude, latitude]);
setPlaceName('Your Location');


if (marker) {
  marker.remove();
}

const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
setMarker(newMarker);
map.setCenter([longitude, latitude]);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImage(reader.result);
    }
    
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  

  async function handleSubmit(event) {
    const userId = JSON.parse(localStorage.getItem("user"));
    let connectedUserId;
    if (userId._id) {
      connectedUserId = userId.username;
    } else if (userId.facebookId) {
      connectedUserId = userId.username;
    } else {
     alert("User ID not found.");
      return;
    }

    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    if (location) {
      formData.append('location', JSON.stringify({ coordinates: location, place_name: placeName }));
    }
    if (image) {
      formData.append('image', image);
    }
  
    try {
      await updateEvent(id, formData,connectedUserId);
    } catch (error) {
      console.error(error);
    }
  }
  

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
            <div className="map-container">
              <div className="map" id="map"></div>
            </div>
            <Form.Control type="text" value={placeName} onChange={(e) => setPlaceName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
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