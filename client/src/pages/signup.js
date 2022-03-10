import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signup} from '../actions/authactions';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';
import './form.css';
import {  Redirect } from 'react-router-dom';
 const Signup=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const[firstname,setFirstname]=useState("");
	const[lastname,setLastname]=useState("");
	const[email,setEmail]=useState("");
	const[password,setPassword]=useState("");
	const mystyle={marginTop:"20px"};
	const {user :userred}=auth;
	
	useEffect(() => {
   
      console.log(auth.signup);
    
	console.log(auth.error);
  }, [auth.signup,auth.error]);
	
	const submitfunc=(e)=>{
		e.preventDefault();
		const user={firstname,lastname,email,password};
		dispatch(signup(user));
		cleanupfunc();
		
		
	}
	const cleanupfunc=()=>{
		setFirstname("");
		setLastname("");
		setEmail("");
		setPassword("");
		
	}
	if(auth.signup){
		return <Redirect to={"/signin"} />
		}
	return(
		<>
		
		<Navigation>
		<div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",}}>
      <header className="App-header">
       <div className="formwrapper">
		<div className="inputs" style={mystyle} >
			<span>First Name</span>
			<input  type="text" value={firstname} onChange={(e)=>{setFirstname(e.target.value);}}/>
		</div>
		<div className="inputs" style={mystyle} >
			<span>Last Name</span>
			<input  type="text" value={lastname} onChange={(e)=>{setLastname(e.target.value);}}/>
		</div>
		<div className="inputs" style={mystyle} >
			<span>Email</span>
			<input  type="text" value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
		</div>
	    <div className="inputs" style={mystyle}>
			<span>PASSWORD</span>
			<input type="text"  value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
	    </div>
		<div> <input type="submit" value="SUBMIT" onClick={submitfunc}/></div>
	   </div>
	   
	   <p>{userred.firstName && userred.firstName } </p>
	    <div>{auth.error && (<h1>ERROR OCCURED</h1>) } </div>
      </header>
    </div>
		</Navigation>
		<Footer></Footer>
		</>
	);

}
export default Signup;
