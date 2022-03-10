import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateuser,signout} from '../../actions/authactions';
import {createpost,getpostbyuser,deletePost,like,unlike,getNewsFeed} from '../../actions/admin/post';
import {getfriendsuggestions} from '../../actions/admin/getuseractions';
import SinglePost from '../subcomponents/singlepost';
import FriendSuggestions from '../subcomponents/friendsuggestions';
import LeftSidebar from '../subcomponents/leftsidebar';

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl=process.env.REACT_APP_IMG;
const api=process.env.REACT_APP_API;
 const Feed=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const postred = useSelector((state) => state.post);
	const allusers =useSelector((state)=>{return state.users});

	const [feedposts,setFeedposts]=useState({});
	const [posttext,setPosttext]=useState("");
	/* const [deletepostid,setDeletepostid]=useState("");
	const [likedpostid,setLikedpostid]=useState("");
	const [dislikedpostid,setDislikedpostid]=useState(""); */



	const [uid,setUid]=useState(props.match.params.uid);
	const {user :userred}=auth;
	let post={};
	
	let details={};
	if(userred && posttext !== ""){
	 post={text:posttext,postedBy:userred._id};
	}
	



	const cPost=()=>{
		if(post.postedBy){
		dispatch(createpost(post));
		setPosttext("");
		}
	}
	
	
    useEffect(() => {
	
	setFeedposts(postred.feed);
	
	
  }, [postred.feed]);
  
  
/*   useEffect(() => {
	
	
	console.log(postred.likedpost);
	
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
	   // details={following:,loggeduser:}
	   if(userred._id && userred._id != ""){
	let feeddetails={loggeduser:userred._id,following : userred.following };
	dispatch(getNewsFeed(feeddetails));
	   }
  }, [userred._id ,userred ]);
  
   /* useEffect(() => {
	details={id:userred._id,following:userred.following};
	if(userred._id  != ""){
	dispatch(getfriendsuggestions(details));
	}
  }, [userred._id ]); */
  
  useEffect(() => {
			if(allusers.suggestions && allusers.suggestions.length > 0 ){
				console.log(allusers.suggestions);
			}
  		}, [allusers.suggestions]);
  
 
	const logout=()=>{dispatch(signout());}
	return(
		<>
		<Navigation>
		<div className="mainpostpage" style={{display:"flex",marginTop:"30px"}}>
		<div className="postpageleft" style={{flex:"1"}}>
		{
				
				<LeftSidebar userId={userred && userred._id}/>
			}
		
		</div>
		<div className="postswrapper" style={{flex:"3",margin:"0px 30px",}}>
		{  userred._id ?
			<div style={{backgroundColor:"#394264",borderRadius: "5px"}}>
		<div style={{margin:"15px"}}>
		<textarea style={{width:"100%",height:"80px",marginTop:"20px",borderRadius: "5px"}}value={posttext} onChange={(e)=>{setPosttext(e.target.value)}} />

		<input style={{background: "#11a8ab",}} type="submit" value="Post"  onClick={cPost}/>
		
		</div>
		</div> :null
		}
		<div>
			{
				Object.keys(feedposts).map((p,index)=>{ 
					
					
					
					return(
					<div style={{marginTop:"10px",backgroundColor:"#394264",borderRadius: "5px"}} key={index}>
					
							      
					<SinglePost key={index} postId={feedposts[p]._id} likes={feedposts[p].likes} loggeduser={userred._id} text={feedposts[p].text}
						comments={feedposts[p].comments} postedBy={feedposts[p].postedBy.firstName} profilepic={feedposts[p].postedBy.pofilePicture}
						postUserId={feedposts[p].postedBy._id}
					/>
					</div>
					)
					}
					)
				
				
				
				
			}
		</div>	
		</div>
		<div className="postpageright" style={{flex:"1"}}>
		{
			

			<FriendSuggestions/>
			}
		</div>

		</div>
	</Navigation>
	<Footer></Footer>
	</>
	);

}
export default Feed;
