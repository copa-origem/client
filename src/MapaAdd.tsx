import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MapWithMarker from "./components/MapComponent";


function MapaAdd() {
    const location = useLocation();
    const type = location.state?.type;

    const [coords, setCoords] = useState<{ lat: number; lng: number} | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (coords == null) {
            alert("Escolha um ponto no mapa!");
            return;
        }

        navigate('/descriptionAdd', { state: {type: type, coords: coords } });
    }

    return (
        <div>
            <h2>Selecione a localização do problema</h2>
            <MapWithMarker onLocationChange={setCoords} />

            {coords && (
                <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
                    Latitude: {coords.lat} | Longitude: {coords.lng}
                </pre>
            )}
            <button onClick={handleSubmit}>Prosseguir</button>
        </div>
    );
}

export default MapaAdd;