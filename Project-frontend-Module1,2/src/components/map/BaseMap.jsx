import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MAP_CONFIG } from '@/utils/constants';
import 'leaflet/dist/leaflet.css';

// Component to update map view
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const BaseMap = ({ 
  center = MAP_CONFIG.DEFAULT_CENTER, 
  zoom = MAP_CONFIG.DEFAULT_ZOOM,
  children,
  className = 'h-96 w-full rounded-lg',
  ...props 
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      {...props}
    >
      <TileLayer
        attribution={MAP_CONFIG.ATTRIBUTION}
        url={MAP_CONFIG.TILE_LAYER}
      />
      <MapUpdater center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
};

export default BaseMap;
