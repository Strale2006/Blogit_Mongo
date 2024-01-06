import {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import './PrivateScreen.css'
import '../../index.css'

const PrivateScreen = (effect, deps) =>{

    const history = useNavigate();

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [isVerified, setIsVerified] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState();

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleInputChange = (event) => {
        setTaskTitle(event.target.value);
    };
    const handleProfileClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTasks = [...tasks, taskTitle];
        setTasks(newTasks);
        setTaskTitle("");
        closeModal();

        //Dodavanje taska u bazu
        try {
            await axios.put('/api/auth/tasks', { userId: privateData.id, tasks: newTasks });
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);

        //Brisanje taska iz baze
        try {
            await axios.put('/api/auth/tasks', { userId: privateData.id, tasks: newTasks });
        } catch (error) {
            console.error(error);
        }
    };
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history("/login");
    }

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history("/login");
        }

        const fetchPrivateData = async () => {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const {data} = await axios.get("/api/private", config);

                setPrivateData(data);
                setIsVerified(data.isVerified);
                setUsername(data.username);

                const taskData = await axios.get(`/api/auth/tasks/${data.id}`);

                if (Array.isArray(taskData.data.data)) {
                    setTasks(taskData.data.data);
                } else {
                    console.error('Tasks data is not an array:', taskData);
                    setTasks([]);
                }
            }catch (e) {
                localStorage.removeItem("authToken");
                setError("You are not authorized, please login");
            }

        }

        fetchPrivateData().then().catch(error => {
            console.log("Error:", error);
        });

    }, [history]);

    const lordIconStyle = {
        width: "30px",
        height: "30px",
    }

    return (
        <div className="to-do__screen">
            {error && <span className="error-message">{error}</span>}
            {isVerified===false && <span className="error-message">Please verify your email. <Link to="/sendVerificationEmail">Send verification email</Link></span>}

            <div className="content-header">
                <h1>Website To-Do</h1>
                <div className="user-profile">
                        <h2 className="verification-screen_title">Hi, {privateData.username}</h2>

                    <div className="profile" onClick={handleProfileClick}>
                        <div className="pfp-holder">
                            <div className="pfp"></div>
                        </div>

                        {isMenuOpen && (
                            <div className={`dropdown-menu ${isMenuOpen ? 'show' : ''}`}>
                                <a href="/profile">Profile</a>
                                <a onClick={logoutHandler}>Log Out</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="content">
                <div className="header">
                    <h1>TO-DO</h1>
                </div>
                <div className="task-container">
                {tasks.length === 0 ? (
                    <span className="no-tasks">No tasks found.</span>
                ) : (
                    tasks.map((task, index) => (
                        <div className='task' key={index}>
                            <h1>{task}</h1>
                            <lord-icon
                                src="https://cdn.lordicon.com/exkbusmy.json"
                                trigger="click"
                                colors="outline:#121331,primary:#646e78,secondary:#545454,tertiary:#ebe6ef"
                                stroke="100"
                                state="hover-empty"
                                style={lordIconStyle}
                                onClick={() => handleDelete(index)}>
                            </lord-icon>
                        </div>
                    ))
                )}
                </div>

                <button className='new-btn'>
                    <h2 onClick={openModal}>+ NEW TASK</h2>
                </button>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-background">
                            <form onSubmit={handleSubmit}>
                                <h1>Task title</h1>
                                <input required className='task-input' type="text" maxLength='30' placeholder='Task title...' value={taskTitle} onChange={handleInputChange} />
                                <button className='task-button' type="submit">Submit</button>
                            </form>
                            <button className='task-button' onClick={closeModal}>Close</button>
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
};

export default PrivateScreen;
