import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MessagesList.css';

function MessagesList() {
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate(); // Obtiene la función navigate

    const getCanciones = async() => {
        try{
            const response = await fetch('http://localhost:5000/canciones');
            const data = await response.json();
            console.log(data);
            setSongs(data);
        }
        catch(error){
            console.log(error);
        }
        
        
      }

    useEffect(() => {
        getCanciones();
        
    }, []);

    // Función para manejar la navegación al hacer clic en una canción
    const handleSongClick = (song) => {
        console.log(song);
        const songJson = JSON.stringify(song);
        navigate(`/messages/${encodeURIComponent(songJson)}`);
    }

    return (
        <div className='AppBg'>
            <h1 className="titulo">Lista de Canciones</h1>
            <div className="song-list-container"> {/* Nuevo contenedor para las canciones */}
                <ul className="song-list">
                    {songs.map((song, index) => (
                        <li key={index} onClick={() => handleSongClick(song)}>
                            {song.nombre}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MessagesList;
