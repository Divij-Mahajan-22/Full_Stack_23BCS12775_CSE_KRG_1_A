import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOCAyaDhsNCAydjE2YTIgMiAwIDAgMS0yIDJoLTJhMiAyIDAgMCAxLTItMkg4YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjRsNC0yeiI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAxN2gtOCI+PC9wYXRoPjxjaXJjbGUgY3g9IjcuNSIgY3k9IjE3IiByPSIuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTYuNSIgY3k9IjE3IiByPSIuNSI+PC9jaXJjbGU+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapMarker = ({ 
  position, 
  type = 'default',
  title,
  description,
  onClick,
  children 
}) => {
  const icon = type === 'bus' ? busIcon : undefined;

  return (
    <Marker 
      position={position} 
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      {(title || description || children) && (
        <Popup>
          {title && <h3 className="font-semibold text-base mb-1">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
          {children}
        </Popup>
      )}
    </Marker>
  );
};

export default MapMarker;
