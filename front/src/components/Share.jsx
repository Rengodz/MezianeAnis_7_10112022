import { useState } from 'react';
import axios from 'axios';

const POST_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const Share = ({ onAddTopic }) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId'),
    email:localStorage.getItem('email'),
    topicText: '',
    imageUrl: undefined, // make imageUrl optional
    comments: [],
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  const [topic, setTopic] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      // check if imageUrl value is undefined or if user selected a file
      const imageUrl = e.target.files.length > 0 ? e.target.files[0] : undefined;
      setFormData({
        ...formData,
        imageUrl, // set the value accordingly
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
      formDataWithImage.append('email', formData.email);
      if (formData.imageUrl) { // check if imageUrl value is defined
        formDataWithImage.append('imageUrl', formData.imageUrl);
        window.location.reload();
      }

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
        email:localStorage.getItem('email'),
        topicText: '',
        imageUrl: undefined, // set imageUrl value to undefined
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
        email: localStorage.getItem('email'),
        topicText: '',
        imageUrl: undefined, // set imageUrl value to undefined
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

