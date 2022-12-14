import React, { useState } from "react";
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer,ChannelContainer,Auth } from "./components";
import 'stream-chat-react/dist/css/index.css'; 
import "./App.css";


const cookies=new Cookies();
const apiKey="8ekz8gq526qc";
const client=StreamChat.getInstance(apiKey);

const authToken=cookies.get("token");

if(authToken){
    client.connectUser({
        name:cookies.get('userName'),
        fullName:cookies.get('fullName'),
        id:cookies.get('userId'),
        phoneNumber:cookies.get('phoneNumber'),
        image:cookies.get('avatarURL'),
        hashedPassword:cookies.get('hashedPassword'),
    },authToken);
}


function App() {

    const [createType,setCreateType]=useState('');
    const [isCreating,setIsCreating]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    if(!authToken) return <Auth />;

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer   
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}                   
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}                   
                    isEditing={isEditing} 
                    setIsEditing={setIsEditing}
                    createType={createType}


                />

            </Chat>
        
    
    
        </div>
    );
}

export default App;