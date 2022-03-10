import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deletecomment,comment,deletePost,like,unlike} from '../../actions/admin/post';
const SinglePost=(props)=>{
	const [deletedcommentid,setDeletedcommentid]=useState("");
	const postred = useSelector((state) => state.post);
	const dummyimg="https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";
	const dispatch = useDispatch();
	const [textarea, setTextarea] = useState("");
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;

	const [deletepostid,setDeletepostid]=useState("");
	const [likedpostid,setLikedpostid]=useState("");
	const [dislikedpostid,setDislikedpostid]=useState("");
	
	
	let hasliked =props.likes && props.likes.includes(props.loggeduser);
	let hascomments=props.comments && props.comments.length > 0  ;
	
	const newcomment =(postid)=>{
					//details={postId:.....,comment:{userId:props.loggeduser,text:...}};
		if(textarea && textarea != ""){
			dispatch(comment({postId:postid,comment:{postedBy:props.loggeduser,text:textarea}}));
			setTextarea("");
		}
		
	}
	const deletecommentfunc =(commentid,postid)=>{
		
		if(commentid){
						//details={postId:.....,comment:{commentId:......}};

			dispatch(deletecomment({postId:postid,comment:{_id:commentid}}));
			
		}
		
	}
	const handleChange = (event) => {
    setTextarea(event.target.value);
	
			}
			
	/*  useEffect(() => {
	
  }, [postred.posts]);		
   useEffect(() => {
	
  }, [postred.feed]);	
  
  useEffect(() => {
	
	
	console.log(postred.likedpost);
	//console.log(userred._id);
  }, [postred.likedpost]); */
  
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
	
  }, [dislikedpostid]);
  
  

	return (
	<>
		<div style={{padding:"20px",}}>
					<div style={{display:"flex"}}>
						<p><img style={{width:"50px" , height:"50px",borderRadius:"50%"}} src={props.profilepic ? props.profilepic : dummyimg }/></p>
						<p style={{flex:"9",padding:"10px 0px",marginLeft:"10px"}}> {props.postedBy && props.postedBy} </p> 
						<div style={{flex:"1"}}>
							{ props.postUserId == userred._id ?
											(	<input type="submit" value="X" style={{color:"white",background:"#e64c65",padding:"5px",width:"30px",textAlign:"center"}} onClick={()=>{setDeletepostid(props.postId)}}/> ) : null
							}					
						</div>
						
					</div>
					<p style={{paddingBottom:"40px"}}> {props.text} </p> 
					
					<div style={{display:"flex",justifyContent:"space-around",margin:"10px"}}>
					
					<input type="submit" value={hasliked ? "unlike" : "like" } style={{position:"relative",right:"50%",width:"50px",textAlign:"center",color:"white",background:"#009DDC",padding:"10px"}} onClick={()=>{hasliked ? setDislikedpostid(props.postId) :setLikedpostid(props.postId)}}/>
					
					
					</div>
					
					<div className="commentbox" style={{ display:"flex", textAlign: "center",alignItems:"center"}}>
					  <div style={{flex:"9",padding:"15px 0px"}}>
					    <textarea style={{display: "inline-block",borderRadius: "5px",height:"40px",width:"100%",borderBottomRightRadius:"0px",borderTopRightRadius:"0px"}}value={textarea} onChange={handleChange} />
					  </div>
					  <div style={{flex:"1",}}>
					  <input onClick={()=>{newcomment(props.postId)}}type="submit" value="comment" 
					style={{position:"relative",bottom:"2px",color:"white",background:"#11a8ab",padding:"0px",height:"40px",borderBottomLeftRadius:"0px",borderTopLeftRadius:"0px"}}/>
					  </div>
					</div>
					
					
					
					
					<div className="commentrow" style={{borderTop:"1px solid grey"}}>
					{
						//if(props.comments){ props.comments.length > 0 ? props.comments.map((c,idx)=>(<p key={idx}>{ c ? c.text : null }</p>)):(<p>no comments</p>) }
						//props.comments && props.comments.length > 0 ? (<p>has comments</p>) : (<p>no comments</p>)
						//hascomments ? (<p> {}</p>})    ) : null 
						hascomments ? props.comments.map((c,idx)=>{
							return (
							<div key={idx}  >
							<div  style={{display:"flex",width:"90%"}}>
							<p><img src={c && c != null && c.postedBy.pofilePicture ? c.postedBy.pofilePicture: dummyimg } style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
								
							</p>
							<p style={{bottom:"70%",display:"inline-block"}}>{c && c != null && c.postedBy.firstName}</p> 
							<p  style={{flex:"14" ,right:"5%",position:"relative"}}><br/> {c && c != null && c.text }</p>
								{c && c != null && c.postedBy._id == userred._id ?
									(<input onClick={()=>{deletecommentfunc(c._id,props.postId)}}   type="submit" value="X" style={{height:"20px",color:"white",background:"#e64c65",padding:"1px",flex:"1"}}/>):null
									}
							</div>
							</div>
							)
							
							}) : null 

					}
					</div>
					
		
		</div>
	
	</>
	
	);
}

export default SinglePost;
