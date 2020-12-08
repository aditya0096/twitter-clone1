import React, { useState, useEffect } from 'react';
import './Feed.css';
import Post from './Post';
import TweetBox from './TweetBox';
import db from './firebase';
import FlipMove from 'react-flip-move';

function Feed() {
    const [posts, setPosts] = useState ([]);

    useEffect(() => {
        db.collection("posts").onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => doc.data()))
        ))        
    }, [])
    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox/>
            <FlipMove>
            {posts.map((post) => (
             <Post 
                key={post.text}
                displayName={post.displayName}
                username={post.username}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
             />   
             
            ))}
            </FlipMove>
            {/* <Post
            displayName="Aditya Jadhav"
            username="aditya0096"
            verified={true}
            text="Yooo its Working"
            avatar="https://i.imgur.com/W8rIigm.jpg"
            image="https://media1.giphy.com/media/r1HGFou3mUwMw/giphy.gif"
            />

            <Post
            displayName="Aditya Jadhav"
            username="aditya0096"
            verified={true}
            text="Mood mein hai kya maar khane ke"
            avatar="https://i.imgur.com/W8rIigm.jpg"
            image="https://media1.giphy.com/media/r1HGFou3mUwMw/giphy.gif"
            />
          */}
        </div>
    )
}

export default Feed
