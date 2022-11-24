import React from 'react';

function LoginForm() {
    return (
        <form>
            <div className="form-inner">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password"/>
                </div>
                <button>Se connecter</button>
                <button>S'inscrire</button>
            </div>
        </form>
    )
}

export default LoginForm