
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./App.css";
import Widgets from "./Widgets";
import { Button, Input, Modal, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { auth} from './firebase'
import "./App.css";
import './Login.css'

function  getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2,4,3)
  },
}));
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  // const [displayname, setDisplayname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null)
  
  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // User logged in
        setUser(authUser)
        console.log(authUser)


        // if (authUser.displayName) {
        //   //dont update username
        // } else {
        //   // if we just created someone
        //   return authUser.updateProfile({
        //     displayName: username,
        //   })
        // }
      } else {
        // user has logged out
        setUser(null)
      }
    })

    return () => {
      // perform some clenaup actions 
      unsubscribe()
    }

  }, [user, username]);

   //UseEffect => runs a piece of code based on specific condition

  //  useEffect(() => {
  //    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
  //      setPosts(snapshot.docs.map(doc => ({
  //        id: doc.id,
  //        post: doc.data()
  //    })));
  //  })
  //  },[]);

  const signUp = (event) => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username

      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) =>alert(error.message))

   
  }

  return (
    // BEM
    <div className="app__home">
       {!user ? (
      <div className="app__login">
        <div className="login"> 
            <div className="login__container">
                <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKo5XgOrtcaYXbgrtK6pgeyVVS7wf5bXQHUg&usqp=CAU"
                alt=""
                ></img>
                <div className="login__inputs">
                    <Input className="input__text"  value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Phone number, username, email"></Input>
                    <Input className="input__text"  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></Input>
                </div>
                <Button type="submit" onClick={signIn}>Log In</Button>
                <div className="login__text">
                    <h4>Don't have an Account?</h4> 
                    <button  onClick={() => setOpen(true)}><strong>Sign Up</strong></button>
                <Modal
                    open = {open}
                    onClose={() => setOpen(false)}
                >
                <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                <center>
                <img
                    classes="app__headerImage1"
                    src="http://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="">
                    </img>
                </center>
                <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                >
                </Input>
                <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
                </Input>
                <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                
                </Input>
                
                <Button className="login__signup" onClick={signUp} type="submit" ><strong>Sign Up</strong></Button>
                </form>
                </div>
                </Modal>
                    
                </div>
                
            </div>
        </div>
      </div>
    ) : (
    <div className="app">
      <Sidebar />
      <Feed />
      {/* {user ? (
          <button className="app__logout"  onClick={() => auth.signOut()}><strong>Log Out</strong></button>
        ): (
          <div>Need to Login</div>
          
        )} */}
      <Widgets />
    </div>
  )
}
</div>
  );
}
export default App;
