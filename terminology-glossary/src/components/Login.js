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
                push('/glossary')
            })
            .catch((err) => console.log(err))
    }

    const handleRegister = () => {
        axios.post('/auth/register', {email, password, adminKey})
        .then((res) => {
            console.log(res.data)
            dispatch(setUser(res.data))
            push('/glossary')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <h1>Login Header</h1>
            <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
            {!isAdmin && (
                <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder='Admin Key'></input>
            )}
            <br></br>
            <input type="checkbox" checked={isAdmin === false} id="adminCheckbox" onChange={() => setIsAdmin(!isAdmin)} /> <span> Admin </span>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login