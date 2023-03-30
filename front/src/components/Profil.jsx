import React, { useState } from "react";
import axios from "axios";

const DELETE_URL = 'http://localhost:5000/api/auth/';
const email = localStorage.getItem('email');
const userId = localStorage.getItem('userId');

function Profil({ user, onLogout }) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (window.confirm("Etes vous sûr de vouloir supprimer vôtre compte ?")) {
      try {
        setDeleting(true);
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
        await axios.delete(`http://localhost:5000/api/auth/${userId}`, config);
        setDeleting(false);
        localStorage.clear(); // call the onLogout callback prop to log out the user
      } catch (error) {
        console.error(error);
        setDeleting(false);
        window.alert("An error occurred while deleting your account.");
      }
    }
  };
  

  return (
    <div>
      <h1>Bienvenue, {email} !</h1>
      <button disabled={deleting} onClick={handleDeleteAccount}>
        {deleting ? "Deleting..." : "Supprimer mon compte"}
      </button>
    </div>
  );
}

export default Profil;