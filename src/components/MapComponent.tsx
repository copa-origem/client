import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStye = {
    width: "100%",
    height: "500px"
};

type MapWithMarkerProps = {
    onLocationChange: (coords: { lat: number; lng: number}) => void;
}

function MapWithMarker({ onLocationChange }: MapWithMarkerProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [center, setCenter] = useState({ lat: -12.9714, lng: -38.5014 });
    const [marker, setMarker] = useState<{ lat: number; lng: number} | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLocation = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    };
                    setCenter(userLocation);
                    setMarker(userLocation);
                    if (onLocationChange) onLocationChange(userLocation);
                }
            );
        }
    }, [onLocationChange]);

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarker(newPosition);
        if (onLocationChange) onLocationChange(newPosition);
    };

    if (!isLoaded) return <p>Carregando...</p>;

    return (
            <GoogleMap
                mapContainerStyle={containerStye}
                center={center}
                zoom={17}
                onClick={handleMapClick}
            >
                {marker && <Marker position={marker}/>}
            </GoogleMap>
    );

}

export default MapWithMarker;