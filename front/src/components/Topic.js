import React from 'react';
import axios from 'axios';

const DELETE_URL = 'http://localhost:5000/api/topics/';

const Topic = ({ topic, onRemoveTopic }) => {
  const userId = localStorage.getItem('userId');

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

  return (
    <li>
      <h3>{topic.topicText}</h3>
      <p>{topic.imageUrl}</p>
      <p>{topic._id}</p>
      {/* Add additional markup here to display other properties of the topic */}
      {userId === topic.userId && (
        <button onClick={() => handleDelete(topic._id)}>Delete</button>
      )}
    </li>
  );
};

export default Topic;
