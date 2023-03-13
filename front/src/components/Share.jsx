import { useState } from 'react';
import axios from 'axios';

const POST_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const Share = ({ onAddTopic }) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId'),
    topicText: '',
    imageUrl: '',
    comments: [],
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        POST_URL,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      onAddTopic(response.data);
      setFormData({
        ...formData,
        topicText: '',
        imageUrl: '',
        comments: [],
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topicText"
          placeholder="Que voulez-vous exprimer ?"
          value={formData.topicText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Lien vers une image (optionnel)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Partager</button>
      </form>
    </div>
  );
};

export default Share;