import { useState } from 'react';
import axios from 'axios';

const POST_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const Share = ({ onAddTopic }) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId'),
    topicText: '',
    imageUrl: null,
    comments: [],
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  const [topic, setTopic] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('topicText', formData.topicText);
      formDataWithImage.append('userId', formData.userId);
      formDataWithImage.append('imageUrl', formData.imageUrl);

      const response = await axios({
        method: 'post',
        url: POST_URL,
        data: formDataWithImage,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      onAddTopic(response.data);
      setFormData({
        userId: localStorage.getItem('userId'),
        topicText: '',
        imageUrl: null,
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
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${POST_URL}/${topic._id}`,
        {
          topicText: formData.topicText,
          imageUrl: formData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setFormData({
        userId: localStorage.getItem('userId'),
        topicText: '',
        imageUrl: null,
        comments: [],
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      });
      setTopic(null);
    } catch (error) {
      console.log(error);
      
    }
  };
  
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <textarea
          name="topicText"
          placeholder="Que voulez-vous exprimer ?"
          value={formData.topicText}
          onChange={handleChange}
        />
        <input
          type="file"
          name="imageUrl"
          onChange={handleChange}
        />
        {topic ? (
          <button type="submit" onClick={handleUpdate}>
            Modifier
          </button>
        ) : (
          <button type="submit">Partager</button>
        )}
      </form>
    </div>
  );
};

export default Share; 

