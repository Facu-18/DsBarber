import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix: Cargar iconos manualmente desde CDN
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const position: [number, number] = [-31.35942, -64.152489] // Córdoba

export default function LeafletMap() {
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-40 rounded-lg z-0">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Bartolomé Hidalgo 1669</Popup>
      </Marker>
    </MapContainer>
  )
}
