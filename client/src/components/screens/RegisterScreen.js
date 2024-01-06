import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./RegisterScreen.css";

const RegisterScreen = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
    }, [navigate]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const { data } = await axios.post("/api/auth/register", { username, email, password }, config);
            localStorage.setItem("authToken", data.token);
            

            navigate("/");
        } catch (e) {
            setError(e.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="register-screen">
            <div className="register-screen-bg">
                <div className="register-form">
                    <div className="register-form-header">
                        <img className="blogit-png" src="/BlogIt.png" alt=""/>
                        <h2>BlogIt</h2>
                    </div>
                    <div className="register-form-middle">
                        <h2>Sign-Up</h2>
                        <form onSubmit={registerHandler}>
                            <div className="form-group">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="register-button" type="submit">Register</button>
                            <h4 className="already-have-an-account">Already have an account? <span className="login-link"><Link to="/login">Login</Link></span></h4>

                        </form>
                    </div>
                    <div className="register-form-footer">
                        <h4>@BlogIt2023</h4>
                        <h4>straleisara@gmail.com</h4>
                    </div>
                </div>
                <div className="register-picture">
                    <img className="blogging-img" src="/BloggingImg.jpg" alt=""/>
                </div>
            </div>
        </div>
    )
};

export default RegisterScreen;
