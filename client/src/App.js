import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//Routing
import PrivateRoute from './components/routing/PrivateRoute';

//Screens
import PrivateScreen from './components/screens/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen'
import SendVerificationEmail from './components/screens/SendVerificationEmail'
import VerifyEmail from './components/screens/VerifyEmail'


const App = () => {

  return (
    <Router>
        <div className="app">
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<PrivateScreen />}/>
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
                <Route path="/passwordreset/:resetToken" element={< ResetPasswordScreen />} />
                <Route path="/sendVerificationEmail" element={<SendVerificationEmail />} />
                <Route path="/verifyEmail/:verificationToken" element={< VerifyEmail />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App;