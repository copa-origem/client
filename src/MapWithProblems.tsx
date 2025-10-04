import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useAuth } from "./hooks/useAuth";

const containerStyle = {
    width: "100%",
    height: "500px",
};

function MapWithProblems() {
    type Problem = {
        id: string;
        lat: number;
        lng: number;
        description: string;
        votes_not_exists: number;
        type: string;
        imageUrl?: string;
    };

    const [center, setCenter] = useState({ lat: -12.9714, lng: -38.5014});
    const [problems, setProblems] = useState<Problem[]>([]);
    const [activeMarker, setActiveMarker] = useState("");
    const { user } = useAuth();


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

    const vote = async (id: string, status: string) => {
        try {
            if (!user) {
                console.error("Usuário não autenticado");
                return;
            }

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:5000/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ problemId: id, status: status})
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok) throw new Error(data.error);
            
            alert(data.message);
        } catch (error) {
            console.error("Erro: " + error);
        }
    }

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
                        onCloseClick={() => setActiveMarker("")}                    
                    >
                        <div>
                            <>
                            <p><b>{p.type}</b></p>
                            <p>{p.description}</p>
                            {p.imageUrl && (
                                <img 
                                    src={p.imageUrl} 
                                    alt={p.description}
                                    style={{ width: "100%", borderRadius: "5px"}} 
                                />
                            )}
                            { user ? (
                                <>
                                <button onClick={() => vote(p.id, "exists")}>Problema ainda existente</button>
                                <button onClick={() => vote(p.id, "not_exists")}>Problema não existente {p.votes_not_exists}/3</button>
                                </>
                            ) : (
                                <>
                                <p>Você deve estar logado para poder votar!</p>
                                </>
                            )}
                            </>
                        </div>
                    </InfoWindow>
                )}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default MapWithProblems;