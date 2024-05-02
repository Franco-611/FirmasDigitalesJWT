import React, { useEffect, useState } from 'react';
import './MessagesList.css';

function MessagesList() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // Inicializa la lista de canciones
        const songList = [
            "Canción 1",
            "Canción 2",
            "Canción 3",
            "Canción 4",
            "Canción 5",
            "Canción 6",
            "Canción 7",
            "Canción 8",
            "Canción 9",
            "Canción 10"
        ];
        setSongs(songList);
    }, []);

    return (
        <div className='AppBg'>
            <h1 className="titulo">Lista de Canciones</h1>
            <div className="song-list-container"> {/* Nuevo contenedor para las canciones */}
                <ul className="song-list">
                    {songs.map((song, index) => (
                        <li key={index}>{song}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MessagesList;
