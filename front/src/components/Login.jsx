import { useState, useEffect } from "react";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = 'http://localhost:5000/api/auth/login';

const Login = () => {
    
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const isValidEmail = USER_REGEX.test(email);
    const isValidPassword = PWD_REGEX.test(password);

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [success])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("response?.data.id : " + response?.data.userId);
            localStorage.setItem('accessToken', response?.data.token);
            localStorage.setItem('userId', response?.data.userId);
            localStorage.setItem('email', response?.data.email);
            localStorage.setItem('is_admin', response?.data.is_admin);
            setSuccess(true);
        } catch (error) {
            setErrMsg('Failed to login. Please try again.');
        }
    }

    useEffect(() => {
        if (success) {
            // Redirect to the topics page if login is successful
            history.push('/topics');
        }
    }, [success, history])

    return (
        <section>
            {errMsg && <p className="errmsg" aria-live="assertive">{errMsg}</p>}
            <h1>Bienvenue</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Email:
                </label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={!isValidEmail}
                    aria-describedby="uidnote"
                />
                <p id="uidnote" className={!isValidEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 a 24 caractères.<br />
                </p>
                <label htmlFor="password">
                    Mot de passe:
                    {isValidPassword && <FontAwesomeIcon icon={faCheck} className="valid" />}
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={!isValidPassword}
                    aria-describedby="pwdnote"
                />
                <p id="pwdnote" className={!isValidPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial.<br />
                </p>
                <button>Se connecter</button>
            </form>
        </section>
    );
}

export default Login;
