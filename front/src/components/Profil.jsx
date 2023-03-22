import React, { useState } from "react";
import axios from "axios";

const DELETE_URL = 'http://localhost:5000/api/user/';
const email = localStorage.getItem('email');

console.log('la page profil');

function Profil({ user, onLogout }) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (window.confirm("Etes vous sûr de vouloir supprimer vôtre compte ?")) {
      try {
        setDeleting(true);
        await axios.delete(`${DELETE_URL}${user.id}`);
        setDeleting(false);
        onLogout(); // call the onLogout callback prop to log out the user
      } catch (error) {
        console.error(error);
        setDeleting(false);
        window.alert("An error occurred while deleting your account.");
      }
    }
  };

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button disabled={deleting} onClick={handleDeleteAccount}>
        {deleting ? "Deleting..." : "Delete my account"}
      </button>
    </div>
  );
}

export default Profil;