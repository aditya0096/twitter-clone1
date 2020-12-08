import React, {useState} from 'react';
import './TweetBox.css';
import { Avatar, Button } from "@material-ui/core";
import {storage,db} from './firebase';


function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState('');
    const [tweetImage, setTweetImage] = useState('');
    const sendTweet =(e) => {
        e.preventDefault();
        
        const ImageRef= storage.ref(`images/${tweetImage.name}`);
        ImageRef.put(tweetImage)
            .then(snapshot => {
                return ImageRef.getDownloadURL()
           
            .then(url => {
                db.collection('posts').add({
                    displayName: 'Aditya Jadhav',
                    username: 'aditya0096',
                    verified: true,
                    text: tweetMessage,
                    image: tweetImage,
                    avatar:"https://i.imgur.com/W8rIigm.jpg"
                });
                setTweetMessage("");
            setTweetImage("");
                
            })
        })
        .catch(error => {

        })

    }
            
     
     const handleChange = (e) => {
        if(e.target.value) {
            setTweetImage(e.target.value);
        }
       
    };
        
    return (
        <div className='tweetBox'>
            <form>
                <div className="tweetBox__input">
                    <Avatar src="https://i.imgur.com/W8rIigm.jpg"/>
                    <input 
                    onChange={(e) => setTweetMessage(e.target.value)}
                    value={tweetMessage} 
                    placeholder="What's happening?" 
                    type="text" />
                </div>
                <input 
                value={tweetImage}
                // onChange={(e) => setTweetImage(e.target.value)}
                className="tweetBox__Imageinput" 
                type="file"
                onChange={handleChange} />

                <Button onClick={sendTweet} type='submit' className="tweetBox__tweetButton">Tweet</Button>
            </form>
            
        </div>
    )
    }

export default TweetBox
