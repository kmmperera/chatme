import React, { useState,useEffect,useRef ,useCallback } from "react";

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { useDispatch, useSelector } from "react-redux";
import {sendnotifications} from '../../actions/admin/notifications';
import {getchat} from '../../actions/admin/chats';
import '../form.css';
import {getallusers ,getInbox} from '../../actions/admin/getuseractions';
import { io } from "socket.io-client";
const Chats=(props)=>{

		const dispatch=useDispatch();

		const auth=useSelector((state)=>{return state.auth});
		const chatsred=useSelector((state)=>{return state.chats});
		const {user :userred}=auth;
		const[message,setMessage]=useState("");
		const[reciever,setReciever]=useState("");
		const[recievername,setRecievername]=useState("");

		const allusers=useSelector((state)=>{return state.users});
		const [displaymessages,setDisplaymessages]=useState(chatsred.chats);
		let localchat=chatsred.chats;
		let chatuser={_id:reciever,loggedid:userred._id};

		const socket = useRef(null);
		const [arrivalMessage, setArrivalMessage] = useState({sender:"",message:""});

		const ownchat={textAlign:"right",height:"50px",backgroundColor:"#0F9295",marginTop:"10px",marginBottom:"10px",maxWidth:"40%",marginLeft:"60%",
borderRadius:"5px",};
		const otherchat={textAlign:"left",height:"50px",backgroundColor:"#0F9295",marginTop:"10px",maxWidth:"40%",borderRadius:"5px",
marginBottom:"10px",};

		  const setRef = useCallback(node => {
				if (node) {
					node.scrollIntoView({ smooth: true })
						}
			}, [])
		const chatuserstyle ={lineHeight:"50px",color:"black",backgroundColor:"#DDDDDD",borderBottom:"1px solid white",textAlign:"center",cursor: "pointer"};
		const chatuseractivestyle ={lineHeight:"50px",color:"#009DDC",backgroundColor:"#DDDDDD",borderBottom:"1px solid white",textAlign:"center",cursor: "pointer"};

		useEffect(()=>{
		 dispatch(getallusers());
		
		},[]);
		
		useEffect(()=>{
			if(userred && userred._id != ""){
		 dispatch(getInbox({id:userred._id}));
			}
		},[userred._id]);
		
		useEffect(()=>{
		 
		 console.log(allusers.inbox);
		
		},[allusers.inbox]);
		useEffect(()=>{
		if(reciever !== "" && reciever !== "notselected"){
		dispatch(getchat(chatuser));
		}
		//console.log("new message");
		},[displaymessages]);


		useEffect(() => {
			if (socket.current == null) {
    			socket.current = io("wss://chatmev2.herokuapp.com:443");
				socket.current.emit("addUser", userred._id);
			}
			
    			socket.current.on("getMessage", (data) => {
     			 setArrivalMessage({
        		 sender: data.sender,
        		 message: data.message,
        			});
	
					console.log(data);
			
    			});
					return () => socket.current.disconnect();
  		}, []);

		useEffect(() => {
    			//socket.current.emit("addUser", userred._id);
   		       socket.current.on("welcome", (message)=>{
				//   setArrivalMessage(message)
							console.log(message);

				   });
			console.log(arrivalMessage);
  		}, [userred._id]);
		
		/* useEffect(() => {
			if(allusers.users && allusers.users.length > 0 ){
				//let inboxowner=allusers.users[1];
			setReciever(allusers.users[1]._id);
    			//	dispatch(getchat(chatuser));
			}
  		}, [allusers]); */


		useEffect(() => {
			if(allusers.inbox && allusers.inbox.length > 0 ){
				//let inboxowner=allusers.users[1];
			setReciever(allusers.inbox[0].messenger._id);
    			//	dispatch(getchat(chatuser));
			}
  		}, [allusers]);
		

		useEffect(() => {
	if(arrivalMessage.message !== ""){
    	let notifiction={message:arrivalMessage.message,reciever:userred._id,sender:arrivalMessage.sender};
	localchat=[...localchat,notifiction];
	dispatch({ type: "newmessage",payload:{localchat}});

	}
			console.log(arrivalMessage);
  		}, [arrivalMessage]);
		useEffect(()=>{
			if(reciever !== "" && reciever !== "notselected"){
			getChat();
			}
		},[reciever]);

	const sendNoti=()=>{
	let notifiction={message:message,reciever:reciever,sender:userred._id};
	localchat=[...localchat,notifiction];
	dispatch({ type: "newmessage",payload:{localchat}});
	 dispatch(sendnotifications(notifiction));
	setMessage("");
	}

	const goOnline=()=>{
		socket.current.emit("addUser", userred._id);
   		       socket.current.on("welcome", (message)=>{setArrivalMessage(message)});
			//console.log(arrivalMessage);
	}
	const socketMessage=()=>{
		let notifiction={message:message,reciever:reciever,sender:userred._id};
		localchat=[...localchat,notifiction];
		dispatch({ type: "newmessage",payload:{localchat}});
		socket.current.emit("sendMessage",{sender:userred._id, reciever:reciever, message:message});
		setMessage("");
	}


	const getChat=()=>{


	dispatch(getchat(chatuser));
	}

	return(
	<>
	<Navigation>
	<div  style={{margin:"10px",display: "flex",alignItems: "center",justifyContent: "center",height:"80vh",}}>
	<div style={{position:"relative",height:"100%",}}>
	<div className="friendlist" style={{borderRadius:"5px",background:"#394264",overflowY:"scroll",height:"97%",maxHeight:"100%",width:"150px",position:"absolute",top:"0",right:"0"}}>
		 {
			/*  allusers.users && allusers.users.map((u,index) => (
            <p className="usernamep"onClick={()=>{setReciever(u._id)}} 
			style={{lineHeight:"50px",color:"black",backgroundColor:"#DDDDDD",borderBottom:"1px solid white",textAlign:"center"}}
			key={u._id} value={u._id} >
              {u.firstName}
            </p>
          )) */
		  
		   allusers.inbox && allusers.inbox.map((u,index) => (
            <p className="usernamep"onClick={()=>{setReciever(u.messenger._id);setRecievername(u.messenger.firstName);}} 
			style={reciever == u.messenger._id ? chatuseractivestyle : chatuserstyle}
			key={u.messenger._id} value={u.messenger._id} >
              {u.messenger.firstName}
            </p>
          ))
		  
		  }
	</div>
	
	</div>
	
	
	<div className="rightwrapper" style={{width:"400px",maxHeight:"100%",height:"100%",marginLeft:"30px"}}>
	
		<div className="chatbox" style={{padding:"5px",borderRadius:"5px",background:"#394264",overflowY:"scroll",maxHeight:"100%",height:"75%"}}>
		
			{localchat &&
		localchat.length > 0 ? localchat.map((c,index)=>{
		let isownmessage = c.sender === userred._id ;
				return (<p ref={index === localchat.length - 1 ? setRef : null} style={isownmessage ? ownchat :otherchat  } key={index} >{c.message}</p>)
				}
				)  :  (<p>You havent not started a conversation yet ,say hello to start </p>)

				
		}

			

		</div>
	
	 
	 <div style={{}}><input type="text"   name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}/></div>
	 <div style={{}}><input type="submit" value="SEND" onClick={socketMessage}/></div>
	
	
	</div>
	
	</div>
	
	
	</Navigation>

	</>
	);
	
}
export default Chats;
