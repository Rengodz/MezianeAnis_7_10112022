import React, { useState } from 'react';
import axios from 'axios';

const DELETE_URL = 'http://localhost:5000/api/topics/';

const Topic = ({ topic, onRemoveTopic, onUpdateTopic, onTopicLike }) => {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');
  const is_admin = localStorage.getItem('is_admin');

  const [updatedImageUrl, setUpdatedImageUrl] = useState(topic.imageUrl);
  const [like, setLike] = useState(topic.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTopicText, setUpdatedTopicText] = useState(topic.topicText);
  const [updatedTopic, setTopic] = useState(topic); // Define the state variable for updated topic

  const likeHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/topics/${topic._id}/like`,
        { like: isLiked ? 0 : 1 }, // send the like status to the server (like=1, dislike=-1, unlike=0)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const updatedTopic = response?.data?.topic;
      if (updatedTopic) {
        setLike(updatedTopic.likes);
        setIsLiked(!isLiked);
        onTopicLike(updatedTopic._id, !isLiked);
        setTopic(updatedTopic); // update the topic with the updated likes count
        console.log('Topic liked:', updatedTopic);
      } else {
        console.log('Error updating topic:', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      const response = await axios.put(
        `http://localhost:5000/api/topics/${id}`,
        {
          topicText: updatedTopicText,
          imageUrl: updatedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      console.log('Topic updated:', response.data);
      onUpdateTopic(response.data); // include the updated topic data in this function call
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUpdate = () => {
    setUpdatedTopicText(topic.topicText);
    setIsEditing(false);
  };

  return (
    <li className='postCard'>
      <h3>{topic.email}</h3>
      <p className='datecr'>Date du post: {topic.creationDate}</p>
      {isEditing ? (
        <textarea
          value={updatedTopicText}
          onChange={(e) => setUpdatedTopicText(e.target.value)}
        />
      ) : (
        <p>{topic.topicText}</p>
      )}
      {topic.imageUrl && (
        <img className='postImg' src={`uploads/${topic.imageUrl}`} alt='topic image' />
      )}
      <p>Likes: {like}</p>
      {((userId === topic.userId) || (is_admin === 'true')) && (
        <button onClick={() => handleDelete(topic._id)}>Supprimer</button>
      )}
      {userId === topic.userId && !isEditing && (
        <button onClick={() => setIsEditing(true)}>Modifier</button>
      )}
      {isEditing ? (
        <>
        <input
          type="file"
          name="imageUrl"
          onChange={handleUpdate}
        />
          <button onClick={() => handleUpdate(topic._id)}>Enregistrer</button>
          <button onClick={handleCancelUpdate}>Annuler</button>
        </>
      ) : (
        <button onClick={() => likeHandler(topic._id)}>Like</button>
      )}
    </li>
  );
};

export default Topic;


