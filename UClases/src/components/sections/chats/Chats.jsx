import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import './chats.css';
import GetUserId from '../../../protected/GetUserId';
import API_URL from '../../../config';

function Chats() {
    const token = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]); // Mensajes del chat activo
    const [newMessage, setNewMessage] = useState(''); // Mensaje que está siendo escrito
    console.log("antes de token")
    const [contacts, setContacts] = useState([]); 
    const [chatDetails, setChatDetails] = useState([]); // Para detalles completos de los chats
 // Almacenar los mensajes del chat activo

// Ahora será un array de objetos
    const userId = GetUserId();
    
    useEffect(() => {

        console.log("UserID obtenido:", userId);
    
        if (userId) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            axios.get(`${API_URL}/usuarios/${userId}/chats`, config)
                .then(async (response) => {
                    console.log("Datos de la API:", response.data);
                    const chatData = response.data;
                    const updatedContactIds = chatData.map(chat => {
                        // Convertir userId a número si es necesario y luego comparar
                        const numericUserId = Number(userId);
                        return chat.usuario1Id === numericUserId ? chat.usuario2Id : chat.usuario1Id;
                    });
                    setContacts(updatedContactIds);

                
                    try {
                        const userDetailsPromises = updatedContactIds.map(id => 
                            axios.get(`${API_URL}/usuarios/read?id=${id}`, config)
                        );
        
                        const userDetailsResponses = await Promise.all(userDetailsPromises);
                        const contactNames = userDetailsResponses.map(response => {
                            const user = response.data[0]; // Asumiendo que siempre hay un elemento en la respuesta
                            return `${user.firstname} ${user.lastname}`;
                        });
        
                        setContacts(contactNames);
                        console.log("Nombres de los contactos actualizados:", contactNames);
                    } catch (error) {
                        console.error('Error al obtener los detalles de los usuarios:', error);
                    }

                    try {
                        const userDetailsPromises = chatData.map(chat => {
                        const otherUserId = chat.usuario1Id === Number(userId) ? chat.usuario2Id : chat.usuario1Id;
                        return axios.get(`${API_URL}/usuarios/read?id=${otherUserId}`, config)
                            .then(res => ({
                                chatId: chat.id,
                                userId: otherUserId,
                                userName: `${res.data[0].firstname} ${res.data[0].lastname}`
                            }));
                    });
    
                    const contactDetails = await Promise.all(userDetailsPromises);
                    setContacts(contactDetails.map(detail => detail.userName)); // Actualizar solo con nombres
                    setChatDetails(contactDetails);

                    } catch (error) {
                        console.error('Error al obtener los detalles de los usuarios:', error);
                    }
                })
                .catch((error) => {
                    console.error('Error al obtener los chats:', error);
                });
        } else {
            console.log("UserID no disponible o no autenticado");
        }
    }, [token]); // Asegúrate de agregar 'token' como dependencia si cambia durante el ciclo de vida del componente
    
    

    const selectChat = (chatDetail) => {
        setActiveChat(chatDetail);
    
        axios.get(`${API_URL}/chat/${chatDetail.chatId}/mensajes`)
            .then(response => {
                console.log("Usuario actual:", userId);
                if (messages.length > 0) {
                    console.log("Ejemplo de remitenteId del mensaje:", messages[0].remitenteId);
                }
                
                setMessages(response.data);
                console.log("Mensajes actualizados:", response.data);
            })
            .catch(error => {
                // Si el servidor responde con un estado 404 o cualquier otro error, muestra el mensaje predeterminado
                if (!error.response || error.response.status === 404) {
                    setMessages([{ id: 'no-message', contenido: "Aún no has empezado la conversación" }]);
                } else {
                    console.error('Error al obtener mensajes del chat:', error);
                }
            });
    };
    
    

    const handleSendMessage = () => {
        if (newMessage.trim() && activeChat) {
            const messageBody = {
                contenido: newMessage,
                remitenteId: userId // Asegúrate de que 'userId' esté disponible y sea el ID del usuario actual
            };
    
            axios.post(`${API_URL}/chat/${activeChat.chatId}/mensajes`, messageBody)
                .then(response => {
                    // Aquí puedes manejar la respuesta, como actualizar la lista de mensajes
                    setMessages(prevMessages => [...prevMessages, response.data]);
                    setNewMessage(''); // Limpia el input después de enviar
                })
                .catch(error => {
                    console.error('Error al enviar el mensaje:', error);
                });
        }
    };
    

    return (
        <div className="chat-page">
            <div className="contacts-column">
                <h2>Tus Chats</h2>
                {chatDetails.map(chatDetail => (
                    <div
                        key={chatDetail.chatId}
                        className={`contact ${activeChat && activeChat.chatId === chatDetail.chatId ? 'active' : ''}`}
                        onClick={() => selectChat(chatDetail)}
                    >
                        {chatDetail.userName}
                    </div>
                ))}
            </div>
            <div className="chat-column">
                {activeChat ? (
                    <div>
                        <h2>Chat con {activeChat ? activeChat.userName : ''}</h2>
                    <div className="message-area">

                        {messages.map(message => (
                            <div
                            
                                key={message.id}
                                className={`message ${Number(message.remitenteId) === Number(userId) ? 'sent' : 'received'}`}

                            >
                                <span className="message-timestamp">{new Date(message.fechaHora).toLocaleString()}</span>
                                <p className="message-content">{message.contenido}</p>
                            </div>
                        ))}
                    </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                            />
                            <button onClick={handleSendMessage}>Enviar</button>
                        </div>
                    </div>
                ) : (
                    <div className="welcome-message">
                        <h2>Bienvenido al chat de UClases</h2>
                        <p>Contactate con tus alumnos o profesores acá</p>
                </div>
            )}
            </div>
        </div>
    );
}

export default Chats;

