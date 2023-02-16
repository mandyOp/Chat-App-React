import React from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import {useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./css/sidebar.css";
import SidebarChat from './SidebarChat';
import {db} from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
function Sidebar() {
   const [rooms, setRooms] = useState([]);
   const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
     db.collection("rooms").onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
     })
  }, [])

  //console.log(rooms);
  return (
    <div className="sidebar">
    <div className="sidebar__header">
    <Avatar src={user.photoURL} onClick={e=>firebase.auth().signOut()}/>

    <div className="sidebar__headerRight">
        <IconButton>
        <DonutLargeIcon/>
        </IconButton>

        <IconButton>
        <ChatIcon/>
        </IconButton>

        <IconButton>
        <MoreVertIcon/>
        </IconButton>
         
    </div>
    </div>
    <div className="sidebar__search">
    <div className="sidebar__searchContainer">
       <SearchIcon/>
       <input type="text" placeholder="Search or Start a new Chat"/>
    </div>
    </div>
    <div className="sidebar__Chats">
       <SidebarChat addnewchat/>
       {
        rooms.map(room=>{
          return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
        })
       }
       
    </div>
    </div>
  )
}

export default Sidebar