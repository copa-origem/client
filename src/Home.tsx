import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type == "") {
      console.log("escolha uma problemática!");
      return;
    }

    navigate('/mapaAdd', { state: {type: type } });

  }

  return (
    <>
    <button>Ver mapa</button>
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Infraestrutura urbana</option>
        <option value="buracos na rua">Buracos na rua / pavimentação danificada</option>
        <option value="Calçada quebrada">Calçada quebrada / irregular</option>
        <option value="Sinaleira quebrada">Sinaleira quebrada / semáforo apagado</option>
        <option value="Iluminação pública apagada ou piscando">Iluminação pública apagada ou piscando</option>
        <option value="Placas de trânsito danificadas ou faltando">Placas de trânsito danificadas ou faltando</option>
        <option value="Calçada quebrada">Calçada quebrada / irregular</option>
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Saneamento e meio ambiente</option>
        <option value="Vazamento de água">Vazamento de água</option>
        <option value="Esgoto a céu aberto">Esgoto a céu aberto</option>
        <option value="Alagamentos em dias de chuva">Alagamentos em dias de chuva</option>
        <option value="Descarte irregular de lixo">Descarte irregular de lixo</option>
        <option value="Lixo acumulado em locais públicos">Lixo acumulado em locais públicos</option>
        <option value="Entulho abandonado">Entulho abandonado</option>
        <option value="Poluição sonora">Poluição sonora</option>
        <option value="Queimadura urbana / fumaça">Queimadura urbana / fumaça</option>
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Espaços públicos</option>
        <option value="Praça/Jardim sem manutenção">Praça/Jardim sem manutenção</option>
        <option value="Parquinho infantil quebrado">Parquinho infantil quebrado</option>
        <option value="Banco ou estrutura danificada em espaço público">Banco ou estrutura danificada em espaço público</option>
        <option value="Árvores caídas / risco de queda">Árvores caídas / risco de queda</option>
        <option value="Árvores obstruindo calçadas ou fiação">Árvores obstruindo calçadas ou fiação</option>
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Mobilidade e transporte</option>
        <option value="Ponto de ônibus sem cobertura ou danificado">Ponto de ônibus sem cobertura ou danificado</option>
        <option value="Faixa de pedestre apagada">Faixa de pedestre apagada</option>
        <option value="Ciclovia danificada ou obstruída">Ciclovia danificada ou obstruída</option>
        <option value="Carros estacionados irregularmente">Carros estacionados irregularmente</option>
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Segurança e cidadania</option>
        <option value="Postes inclinados / risco de queda">Postes inclinados / risco de queda</option>
        <option value="Locais com iluminação insuficiente (sensação de insegurança)">Locais com iluminação insuficiente (sensação de insegurança)</option>
        <option value="Acúmulo de veículos abandonados">Acúmulo de veículos abandonados</option>
        <option value="Denúncia de vandalismo em espaço público">Denúncia de vandalismo em espaço público</option>
      </select>
      <button type="submit">Prosseguir</button>
    </form>
    </>
  )
}

export default App
