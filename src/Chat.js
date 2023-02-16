import React from "react";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import {db} from './Firebase';
import "./css/chat.css";
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import { useStateValue } from "./StateProvider";
function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(()=>{
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("")
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
   useEffect(()=>{
     if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
        setRoomName(snapshot.data().name)
      })
      db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot(snapshot=>{
     setMessages(snapshot.docs.map(doc=>doc.data()))
      })
     }
   },[roomId])
     console.log(messages)
   const sendMessage=(e)=>{
          e.preventDefault();
          if(input===""){
            return alert("Please enter your message")
          }
          db.collection("rooms").doc(roomId).collection("message").add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
          setInput("");
   }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://api.dicebear.com/5.x/personas/svg?seed=${seed}`}/>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>{
            new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
          }</p>
        </div>
        <div className="header__right">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
      {
        messages.map(message=>(
          <p className={`chat__message ${user.displayName==message.name && "chat__reciever" }`}>
          <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__time">{
            new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
          }</span>
        </p>
        ))
      }
        
      </div>

      <div className="chat__footer">
          <EmojiEmotionsIcon/>
          <AttachFileIcon/>
          <form onSubmit={sendMessage}>
          <input type="text" value={input} placeholder="Type your message" onChange={e=>setInput(e.target.value)}/>
          <input type="submit"/>
          </form>
          <MicIcon/>
      </div>
    </div>
  );
}

export default Chat;
