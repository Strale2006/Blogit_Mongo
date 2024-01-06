import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./LoginScreen.css";

const LoginScreen = () => {

    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        
    }, [history]);


    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const {data} = await axios.post(
                "/api/auth/login",
                {email, password},
                config
            );
            const { user } = data;
            console.log(user)

            localStorage.setItem('userData', JSON.stringify(data.user));
            localStorage.setItem("authToken", data.token);
            

            history("/");
        }catch (e){
            setError(e.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 5000)
        }
    }

    return (
        <div className="login-screen">
            <div className="login-screen-bg">
                <div className="login-form">
                    <div className="login-form-header">
                        <img className="blogit-png" src="/BlogIt.png" alt=""/>
                        <h2>BlogIt</h2>
                    </div>
                    <div className="login-form-middle">
                        <h2>Log-In</h2>
                        <form onSubmit={loginHandler}>
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
                            <button className="login-button" type="submit">Login</button>
                            <h4 className="login-no-account">Don't have an account? <span className="register-link"><Link to="/register">Register</Link></span></h4>
                            <h4 className="login-no-account">Forgot your password? <span className="register-link"><Link to="/forgotpassword">Forgot password</Link></span></h4>
                        </form>
                    </div>
                    <div className="login-form-footer">
                        <h4>@BlogIt2023</h4>
                        <h4>straleisara@gmail.com</h4>
                    </div>
                </div>
                <div className="login-picture">
                    <img className="blogging-img" src="/BloggingImg.jpg" alt=""/>
                </div>
            </div>
        </div>
    )

};

export default LoginScreen;