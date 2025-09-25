import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: "100%",
    height: "500px",
};

function MapWithProblems() {
    const [center, setCenter] = useState({ lat: -12.9714, lng: -38.5014});
    const [problems, setProblems] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await fetch("http://localhost:5000/get");
                const data = await res.json();
                setProblems(data);

                if (data.length > 0) {
                    setCenter({ lat: data[0].lat, lng: data[0].lng });
                }
            } catch (error) {
                console.error("Erro ao buscar problemas:", error);
            }
        };

        fetchProblems();
    }, []);

    if (!isLoaded) return <p>Carregando...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
        >
            {problems.map((p) => (
                <Marker 
                    key={p.id}
                    position={{ lat: p.lat, lng: p.lng }}
                    title={`${p.type} - ${p.description}`}
                    onMouseOver={() => setActiveMarker(p.id)}
                    onClick={() => setActiveMarker(p.id)}
                >
                {activeMarker === p.id && (
                    <InfoWindow
                        position={{ lat: p.lat, lng: p.lng }}
                        onCloseClick={() => setActiveMarker(null)}                    
                    >
                        <div>
                            <p><b>{p.type}</b></p>
                            <p>{p.description}</p>
                            {p.imageUrl && (
                                <img 
                                    src={p.imageUrl} 
                                    alt={p.description}
                                    style={{ width: "100%", borderRadius: "5px"}} 
                                />
                            )}
                        </div>
                    </InfoWindow>
                )}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default MapWithProblems;