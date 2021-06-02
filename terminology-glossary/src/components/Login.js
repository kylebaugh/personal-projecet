import axios from 'axios'
import {setUser} from '../redux/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'


const Login = (props) =>{
    const dispatch = useDispatch()
    const {user} = useSelector((state) => {
        return state.authReducer
        })
    const {push} = useHistory()
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminKey, setAdminKey] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    
    useEffect(() => {
        console.log(user)
    }, [user])

    const handleLogin = () => {
        axios.post('/auth/login', {email, password})
            .then((res) => {
                dispatch(setUser(res.data))
                localStorage.setItem('user_id', JSON.stringify(res.data))
                push('/profile')
            })
            .catch((err) => console.log(err))
    }

    const handleRegister = () => {
        axios.post('/auth/register', {firstName, lastName, email, password, adminKey, isAdmin})
        .then((res) => {
            // console.log(res.data)
            dispatch(setUser(res.data))
            localStorage.setItem('user_id', JSON.stringify(res.data))
            push('/profile')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <h1>Login</h1>
                <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                <button onClick={handleLogin}>Login</button>

            <h1>Register</h1>
                <input name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'></input>
                <input name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'></input>
                <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                {!isAdmin && (
                    <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder='Admin Key'></input>
                )}
                <input type="checkbox" checked={isAdmin === false} id="adminCheckbox" onChange={() => setIsAdmin(!isAdmin)} /> <span> Admin </span>
                <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Login