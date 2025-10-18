import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function DescriptionAdd() {

    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState("");

    const location = useLocation();
    const type = location.state?.type;
    const coords = location.state?.coords;

    const navigate = useNavigate();

    const handleSubmit = async () => {
    try {
      let base64Image: string | undefined;

      if (image) {
        // Converte para base64
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => {
            if (typeof reader.result === "string") {
              const result = reader.result.split(",")[1];
              resolve(result);
            } else {
              reject(new Error("Erro ao ler o arquivo"));
            }
          };
          reader.onerror = (error) => reject(error);
        });
      }
      const res = await fetch("https://api-consumo.vercel.app/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type,
          description,
          lng: coords.lng,
          lat: coords.lat,
          image: base64Image
        })
      });

      const data = await res.json();
      console.log(data);
      alert("Problema enviado!");
      navigate('/home');
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }

    }

    return (
        <>
        <input type="file" accept="image/*" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}/>

        <div>
            <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <button onClick={handleSubmit}>Enviar</button>
        </>
    );

}

export default DescriptionAdd;