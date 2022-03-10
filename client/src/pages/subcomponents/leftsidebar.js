import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {userByID ,changeProfilePic} from '../../actions/admin/getuseractions';
import MessageBox from './messagebox';
const LeftSidebar=(props)=>{
	const allusers =useSelector((state)=>{return state.users});
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;
	const [currentuser,setCurrentuser]=useState([]);
	const [profilePicture, setprofilePicture] = useState();
	const dispatch = useDispatch();
    const dummyimg="https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

	
	const handleProfilePicture = (e) => {
    setprofilePicture( e.target.files[0]);
  };
  
  const submitProductForm = () => {
    const form = new FormData();
    

	  form.append("id", userred._id);
      form.append("profilepic", profilePicture);
   

    dispatch(changeProfilePic(form));
  };
	useEffect(() => {
			if(props.userId && props.userId != "" ){
				dispatch(userByID({id:props.userId}));
			}
  		}, [props.userId,allusers.userafterpicupdated,allusers.updatedUser ]);
		
	useEffect(() => {
		setCurrentuser(allusers.userbyid);
			console.log(allusers.userbyid);
  		}, [allusers.userbyid ,currentuser]);
	
	/* useEffect(() => {
	console.log(allusers.userafterpicupdated);
  		}, [allusers.userafterpicupdated]);
	 */
	
	return (
	<>
		
		{ <div style={{backgroundColor:"#394264",borderRadius: "5px"}}>
			
			<div style={{borderTopRightRadius:"5px",borderTopLeftRadius:"5px",padding:"12px 0px" ,textAlign:"center",fontSize:"30px",background:"#11a8ab"}}> {currentuser && currentuser.length > 0 && currentuser[0].firstName}</div>
			<div style={{margin:"10px"}}> <img style={{height:"100px",width:"100px",borderRadius:"50%"}} src={allusers && allusers.userbyid[0] && allusers.userbyid[0].pofilePicture ? allusers.userbyid[0].pofilePicture:dummyimg }/></div>
				{ props.userId === userred._id ? 
			(<div style={{width:"60%",margin:"5px "}}> 
				<input type="file" name="profilepic" onChange={handleProfilePicture} />
				<input type="submit" value="UPLOAD" onClick={submitProductForm}/>

			</div>) :<MessageBox reciever={ props.userId}/> 
				}
			
				
		  </div>	
		}
	
	</>
	
	);
}

export default LeftSidebar;
