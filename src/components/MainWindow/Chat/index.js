import { useEffect, useState } from 'react';
import { getMessages } from '../../../firebase-utils';
import { ChatMessage } from './ChatMessage/index';
import YoutubeEmbed from './YoutubeEmbed/YoutubeEmbed';
import DatabaseImage from './DatabaseImage/DatabaseImage';
import './style.scss';

const msgComponents = {
    'text': ChatMessage,
    'ytVideo': YoutubeEmbed,
    'image': DatabaseImage,
};

export default function Chat() {
    const [messages, setMessages] = useState([])

    useEffect( () => {
        getMessages()
            .then(setMessages)
            .catch((err)=> console.log(err));
    }, [messages])
    
    return (
        <div className="chatContainer">
            {messages.map(msg => {
                const MsgComponent = msgComponents[msg.type];
                return <MsgComponent key={msg.id} message={msg}/>
            })
            }
        </div>
    )
}
