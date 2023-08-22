import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import { Icon } from 'leaflet';
import markerIcon from '../assets/marker.png';

function createCustomIcon() {
    return new Icon({
      iconUrl: markerIcon,
      iconSize: [20, 20], 
    });
  }

function Map() {
  const { data: countriesData, error, isLoading } = useQuery('countriesData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const data = await response.json();
    return data;
  });

  const mapCenter = [20, 0]; // Initial map center
  const mapZoom = 2; // Initial map zoom level


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {countriesData.map(country => (
        <Marker
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={createCustomIcon()}
        >
          <Popup>
            <div>
              <h3>{country.country}</h3>
              <p>Total Cases: {country.cases}</p>
              <p>Active Cases: {country.active}</p>
              <p>Recovered Cases: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
