
import React,{useEffect} from "react";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";
import PrivateRoute from "./pages/redirect";
import Userdetails from "./pages/userdetails";
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn} from './actions/authactions';
import Workhours from "./pages/workhours";
import Allusers from "./pages/admin/allusers";
import Chats from "./pages/admin/chats";
import Profile from "./pages/admin/profile";
import Feed from "./pages/admin/feed";
import Post from "./pages/admin/post";
import Posts from "./pages/admin/posts";

import Suggestions from "./pages/admin/suggestions";

import {getallusers} from './actions/admin/getuseractions';
function App() {
	
	const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

  useEffect(() => {
   
      dispatch(isUserLoggedIn());
    	// dispatch(getallusers());
  }, []);

useEffect(() => {
	if(auth.user.firstName != ""){
   localStorage["user"]=JSON.stringify(auth.user);
    }
  }, [auth.user]);

  return (
  <div className="App">
           <Switch>
		   <Route exact path="/" component={Home} />
		   <PrivateRoute exact path="/signin" component={Signin} />
		   <PrivateRoute exact path="/signup" component={Signup} />
		   <Route exact path="/userdetails" component={Userdetails} />
		   <Route exact path="/workdetails" component={Workhours} />
		   <Route exact path="/allusers" component={Allusers} />
		   <Route exact path="/chats" component={Chats} />
		   <Route exact path="/profile/:id" component={Profile} />
		   <Route exact path="/post/:pid" component={Post} />
		   <Route exact path="/posts/:uid" component={Posts} />

		   <Route exact path="/feed" component={Feed} />
		   <Route exact path="/suggestions" component={Suggestions} />



		   </Switch>
  </div>
  );
}

export default App;
