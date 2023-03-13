import React from 'react';
import axios from 'axios';
import { useState } from "react";

const DELETE_URL = 'http://localhost:5000/api/topics/';
const UPDATE_URL = 'http://localhost:5000/api/topics/';

const Topic = ({ topic, onRemoveTopic, onUpdateTopic }) => {
  const userId = localStorage.getItem('userId');

  const [like,setLike] = useState(topic.like)
    const [isLiked,setIsLiked] = useState(false)
  
    const likeHandler =()=>{
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DELETE_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      onRemoveTopic(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${UPDATE_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      onUpdateTopic(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className='postCard'>
      <h3>{topic.topicText}</h3>
      <p>{topic.imageUrl}</p>
      <span hidden><p>{topic._id}</p></span>
      <button onClick={() => likeHandler (topic.id)}>Like</button>
      {/* Add additional markup here to display other properties of the topic */}
      {userId === topic.userId && (
        <button onClick={() => handleDelete(topic._id)}>Supprimer</button>
      )}
      {userId === topic.userId && (
        <button onClick={() => handleUpdate(topic._id)}>Modifier</button>
      )}
    </li>
  );
};

export default Topic;
