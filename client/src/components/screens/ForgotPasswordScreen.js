import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import {Link} from "react-router-dom";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/forgotpassword",
                { email },
                config
            );

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        <div className="forgot-password-screen">
            <div className="forgot-password-screen-bg">
                <div className="forgot-password-form">
                    <div className="forgot-password-form-header">
                        <img className="blogit-png" src="/BlogIt.png" alt=""/>
                        <h2>BlogIt</h2>
                    </div>
                    <div className="forgot-password-form-middle">
                        <h2>Forgot Password</h2>

                        <form onSubmit={forgotPasswordHandler}>
                            {error && <span className="error-message">{error}</span>}
                            {success && <span className="success-message">{success}</span>}
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

                            <button className="forgot-password-button" type="submit">Send Email</button>
                            <h4 className="forgot-password-no-account">Don't have an account? <span className="register-link"><Link to="/register">Register</Link></span></h4>
                            <h4 className="forgot-password-no-account">Remembered password? <span className="register-link"><Link to="/login">Login</Link></span></h4>
                        </form>
                    </div>
                    <div className="forgot-password-form-footer">
                        <h4>@BlogIt2023</h4>
                        <h4>straleisara@gmail.com</h4>
                    </div>
                </div>
                <div className="forgot-password-picture">
                    <img className="blogging-img" src="/BloggingImg.jpg" alt=""/>
                </div>
            </div>
        </div>
    )

};

export default ForgotPasswordScreen;