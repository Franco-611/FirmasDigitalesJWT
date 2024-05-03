import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './SingleMessageView.css'; // Importa el archivo CSS
import { useParams, Link } from 'react-router-dom';

function SingleMessageView({  }) {

    const { cancion } = useParams();

    const publicKey = sessionStorage.getItem('publicKey');

    const song = JSON.parse(decodeURIComponent(cancion));



    // Verificar si publicKey es nulo y song.info tiene el formato deseado
    const infoFormatRegExp = /^\{"fecha": "\d{4}-\d{2}-\d{2}", "cantante": ".+"\}$/;
    const hasAccess = publicKey !== "null" || infoFormatRegExp.test(song.info);


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
                        {hasAccess ? (
                            <>
                                <h2 className="cancion-title">{song.nombre}</h2>
                                <p className="cancion-cantante">{song.info}</p>
                            </>
                        ) : (
                            <p className="message-content">No tienes acceso</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleMessageView;
