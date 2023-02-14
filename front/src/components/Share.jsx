import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import "./Share.css";
import TopicList from "./TopicList";

const userImg = require('./fleur.jpg');
const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('userId');


const Share = () => {
    const [topic, setTopic] = useState([]);
    const [userId, setUser ] = useState('');
    const [topicText ,setTopicText ] = useState('');
   
    const POST_URL = 'http://localhost:5000/api/topics';

    const handleSubmit = async (e) => {
    e.preventDefault();
        axios.post(POST_URL,
            {
                topic:JSON.stringify({
                    "userId": "",
                    "topicText": "",
                    "likes": "",
                    "dislikes": "",
                    "usersLiked": [],
                    "usersDisliked":[]
                    })
            },
            {
                headers: { 'Authorization': 'Bearer '+ accessToken },
                withCredentials: true
            },
        )
            
            .then((post) => {
                setTopic((topic) => [topic]);
                setUser ((userId));
                
            })

            .catch((err) => {
                console.log(err.message);
            });
        
};

    return (
        <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={userImg} alt="" />

            <form onSubmit={handleSubmit}>
            <input type = "text"
              placeholder="Que voulez vous exprimer ?"
              className="shareInput"
              onChange={(e) => setTopicText(e.target.value)}
            />
            </form>
          </div>
          <hr className="shareHr"/>
          <div className="shareBottom">
              <div className="shareOptions">
                  <div className="shareOption">
                    
                      <span className="shareOptionText">Photo</span>
                  </div>
                  <div className="shareOption">
                      
                      <span className="shareOptionText">Tag</span>
                  </div>
              </div>
              <button className="shareButton" onClick={handleSubmit}>Partager</button>
          </div>
        </div>
      </div>
      
    );
  };

  export default Share;