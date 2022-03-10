import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateuser,signout} from '../../actions/authactions';
import {createpost,getpostbyuser} from '../../actions/admin/post';
import {getfriendsuggestions} from '../../actions/admin/getuseractions';
import SinglePost from '../subcomponents/singlepost';
import FriendSuggestions from '../subcomponents/friendsuggestions';
import LeftSidebar from '../subcomponents/leftsidebar';
import UserList from '../subcomponents/userslist';

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl=process.env.REACT_APP_IMG;
const api=process.env.REACT_APP_API;
 const Posts=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const postred = useSelector((state) => state.post);
	const allusers =useSelector((state)=>{return state.users});

	const [savedpost,setSavedpost]=useState({});
	const [posttext,setPosttext]=useState("");
	/* const [deletepostid,setDeletepostid]=useState("");
	const [likedpostid,setLikedpostid]=useState("");
	const [dislikedpostid,setDislikedpostid]=useState(""); */



	const [uid,setUid]=useState(props.match.params.uid);
	const {user :userred}=auth;
	let post={};
	let user={};
	let details={};
	if(userred && posttext !== ""){
	 post={text:posttext,postedBy:userred._id};
	}
	
	
	
    /* const [textarea, setTextarea] = useState("The content of a textarea goes in the value attribute");

	<textarea value={textarea} onChange={handleChange} />
	  const handleChange = (event) => {
    setTextarea(event.target.value);
	
			}
 */


	const cPost=()=>{
		if(post.postedBy){
		dispatch(createpost(post));
		setPosttext("");
		}
	}
	
	/* const deletePost=(id)=>{
		//details={postId:id};
		dispatch(deletePost({postId:id}));
		console.log(id);
	} */
    useEffect(() => {
	//setSavedpost(postred.posts.slice(0).reverse());
	//setSavedpost( Object.assign([],postred.posts).slice(0).reverse());
	setSavedpost(postred.posts);
	console.log(savedpost);
	console.log(postred.posts);

	console.log(auth.user);
	
  }, [postred.posts]);
   useEffect(() => {
	
	
	//console.log(allusers.userbyid[0].following);
	//console.log(userred._id);
  }, [props.match.params.uid ]);
  
  /* useEffect(() => {
	
	
	console.log(postred.likedpost);
	//console.log(userred._id);
  }, [postred.likedpost]);
  
  useEffect(() => {
	
	if(deletepostid && deletepostid != ""){
		
		dispatch(deletePost({postId:deletepostid}));
	}
	
  }, [deletepostid]);
  
   useEffect(() => {
	
	if(likedpostid && likedpostid != ""){
		
		dispatch(like({postId:likedpostid,userId:userred._id}));
	}
	
  }, [likedpostid]);
  
   useEffect(() => {
	
	if(dislikedpostid && dislikedpostid != ""){
		
		dispatch(unlike({postId:dislikedpostid,userId:userred._id}));
	}
	
  }, [dislikedpostid]); */
  
   useEffect(() => {
	user={id:props.match.params.uid };
	dispatch(getpostbyuser(user));
	
  }, [props.match.params.uid]);
  
  /*  useEffect(() => {
	details={id:userred._id,following:userred.following};
	if(userred._id  != ""){
	dispatch(getfriendsuggestions(details));
	}
  }, [userred._id ]); */
  
  /* useEffect(() => {
			if(allusers.suggestions && allusers.suggestions.length > 0 ){
				console.log(allusers.suggestions);
			}
  		}, [allusers.suggestions]); */
  
 
	const logout=()=>{dispatch(signout());}
	return(
		<>
		<Navigation>
		<div className="mainpostpage" style={{display:"flex",marginTop:"30px"}}>
		<div className="postpageleft" style={{flex:"1" ,}}>
			{
				<>
				<LeftSidebar userId={props.match.params.uid}/>
				
			<UserList displayuser ={allusers && allusers.userbyid && allusers.userbyid.length >0 && allusers.userbyid[0]._id} userlist={allusers && allusers.userbyid && allusers.userbyid.length >0 && allusers.userbyid[0].following }/>	
				</>
			}
		</div>
		<div className="postswrapper" style={{flex:"3",margin:"0px 30px",}}>
		{ props.match.params.uid == userred._id ?
			<div style={{width:"95%",backgroundColor:"#394264",borderRadius: "5px"}}>
			<div style={{margin:"15px"}}>
				{
				//	<input type="text" name="posttext" value={posttext} onChange={(e)=>{setPosttext(e.target.value)}}/>
					}
		<textarea style={{width:"100%",height:"80px",marginTop:"20px",borderRadius: "5px"}}value={posttext} onChange={(e)=>{setPosttext(e.target.value)}} />
		<input className="postsubmitbtn" style={{background: "#11a8ab",}} type="submit" value="Post"  onClick={cPost}/>
		
		</div>
		</div > :null
		}
		<div style={{width:"95%",}}>
			{
					
					Object.keys(savedpost).map((p,index)=>{ 
					
					//let likedornot =savedpost[p].likes && savedpost[p].likes.includes(userred._id);
					
					/* <p> {savedpost[p].text} </p> 
					<div style={{display:"flex",justifyContent:"space-around",margin:"10px"}}>
					<p style={{color:"white",background:"red",padding:"10px"}} onClick={()=>{setDeletepostid(savedpost[p]._id)}}>delete</p>
					<p style={{color:"white",background:"#009DDC",padding:"10px"}}>comment</p>
					<p style={{color:"white",background:"#009DDC",padding:"10px"}} onClick={()=>{likedornot ? setDislikedpostid(savedpost[p]._id) : setLikedpostid(savedpost[p]._id)}}>{likedornot ? "unlike" : "like" }</p>
					
					</div> */
					
					return(
					<div style={{marginTop:"10px",backgroundColor:"#394264",borderRadius: "5px"}} key={index}>
					
							      
					<SinglePost key={index} postId={savedpost[p]._id} likes={savedpost[p].likes} loggeduser={userred._id} text={savedpost[p].text}
						comments={savedpost[p].comments} postedBy={savedpost[p].postedBy.firstName} profilepic={savedpost[p].postedBy.pofilePicture}
						postUserId={savedpost[p].postedBy._id}
					/>
					</div>
					)
					}
					)
					//let reverseposts= postred.posts.reverse();
					// postred.posts.reverse().then((reverseArray)=>{reverseArray.map((p,index)=> (<p key={index}> {p.text} </p>))}).catch((error)=>{console.log(error);return null;}) 
			}
		</div>	
		</div>
		<div className="postpageright" style={{flex:"1",}}>
		{
			// allusers.suggestions && allusers.suggestions.length > 0  && allusers.suggestions.map((s,index)=>{return (<p key={index}> {s.firstName}</p>)})
			<FriendSuggestions/>
			}
		</div>

		</div>
	</Navigation>
	<Footer></Footer>
	</>
	);

}
export default Posts;
