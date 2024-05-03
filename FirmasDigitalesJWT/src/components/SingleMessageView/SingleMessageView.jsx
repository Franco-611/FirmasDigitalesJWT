import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './SingleMessageView.css'; // Importa el archivo CSS
import { useParams, Link } from 'react-router-dom';

function SingleMessageView({  }) {

    const { cancion } = useParams();

    const song = JSON.parse(decodeURIComponent(cancion));




    console.log(song);


    return (
        <div className="single-message-view-container">
            <div className="AppBg">
                <div className="messages-scroll-container">
                    <div className="single-message-container">
                        <div className="header">
                            <Link to="/messages" className="return-link">
                                <ArrowLeftOutlined className="return-icon" />
                            </Link>
                        </div>
                        {song ? (
                            <>
                                <h2 className="cancion-title">{song.nombre}</h2>
                                <p className="cancion-fecha">{song.info}</p>
                                <p className="cancion-cantante">{song.info}</p>
                                {/* Mostrar más detalles de la canción si es necesario */}
                            </>
                        ) : (
                            <p className="message-content">No se ha seleccionado ninguna canción</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleMessageView;
