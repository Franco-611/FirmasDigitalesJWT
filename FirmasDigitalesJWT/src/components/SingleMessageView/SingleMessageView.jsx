
import { ArrowLeftOutlined } from '@ant-design/icons';
import './SingleMessageView.css'; // Importa el archivo CSS
import { useParams, Link } from 'react-router-dom';
import React, { useState } from 'react';

function SingleMessageView({  }) {

    const { cancion } = useParams();
    const [texto, setTexto] = useState([]);
    

    const publicKey = sessionStorage.getItem('publicKey');

    const song = JSON.parse(decodeURIComponent(cancion));

    let bandera = false;



    // Verificar si publicKey es nulo y song.info tiene el formato deseado
    const infoFormatRegExp = /^\{"fecha": "\d{4}-\d{2}-\d{2}", "cantante": ".+"\}$/;
    const hasAccess = publicKey !== "null" || infoFormatRegExp.test(song.info);

    async function decifrado(texto, publicKeyBase64) {
        const response = await fetch('http://localhost:5000/decifrar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jwt_token: texto,
                public_key: publicKeyBase64,
            }),
        });
    
        const data = await response.json();
        console.log(data);
        setTexto(data.textoN)
    }

    if (hasAccess && !infoFormatRegExp.test(song.info)) {
        decifrado(song.info, publicKey)
        bandera = true;

    }

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
                                <p className="cancion-cantante">{bandera ? `{"fecha": "${texto.fecha}", "cantante": "${texto.cantante}"}` : song.info}</p>

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
