import { useState } from 'react';
import axios from 'axios';

const POST_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const Share = ({ onAddTopic }) => {
  const [topicText, setTopicText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        POST_URL,
        {
          userId: localStorage.getItem('userId'),
          topicText: topicText,
          likes: '',
          dislikes: '',
          usersLiked: [],
          usersDisliked: [],
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      onAddTopic(response.data);
      setTopicText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Que voulez-vous exprimer ?"
          value={topicText}
          onChange={(e) => setTopicText(e.target.value)}
        />
        <button type="submit">Partager</button>
      </form>
    </div>
  );
};

export default Share;
