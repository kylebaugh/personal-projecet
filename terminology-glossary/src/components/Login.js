import axios from 'axios'
import {setUser} from '../redux/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from './Header'


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
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [adminKey, setAdminKey] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    
    useEffect(() => {
        console.log('Use effect triggered')
    }, [user])

    const handleLogin = () => {
        axios.post('/auth/login', {email, password})
            .then((res) => {
                dispatch(setUser(res.data))
                localStorage.setItem('user_id', JSON.stringify(res.data))
                // console.log(res.data)
                if(res.data === 409){
                    alert('Email not found')
                }
                push('/profile')
            })
            .catch((err) => {
                if(err+''.includes('409')){
                    alert('Email not found')
                }
                if(err+''.includes('401')){
                    alert('Password incorrect')
                }
                console.log(err)})
    }

    const handleRegister = () => {
        axios.post('/auth/register', {firstName, lastName, registerEmail, registerPassword, adminKey, isAdmin})
        .then((res) => {
            dispatch(setUser(res.data))
            localStorage.setItem('user_id', JSON.stringify(res.data))
            push('/profile')
            })
            .catch((err) => {
                if(err+''.includes('409')){
                    alert('Email already taken')
                }
                if(err+''.includes('401')){
                    alert('Admin Key Incorrect')
                }
                console.log(err)})
    }

    return (
        <div class='loginBackground'>
            <Header />
            <div className='loginPage'>
                <div className='reg'>
                    <h1 className='register'>Sign Up!</h1>
                        <input name='loginInput' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'></input>
                        <input name='loginInput' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'></input>
                        <input name='loginInput' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder='Email'></input>
                        <input name='loginInput' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder='Password'></input>
                        {!isAdmin && <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder='Admin Key'></input>}
                        <div className='adminCheckbox'>
                            <input type="checkbox" checked={isAdmin === false} id="adminCheckbox" onChange={() => setIsAdmin(!isAdmin)} />
                            <span style={{color:'white'}}>Admin Account?</span>
                        </div>
                        <button className='registerButton' onClick={handleRegister}>Register</button>
                        <span className='registration'>A confirmation email will be sent upon registration</span>
                </div>
                
                <div className='loginDivider'></div>
                <div className='log'>
                    <h1 className='login'>Login!</h1>
                        <input name='loginInput' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                        <input name='loginInput' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                        <button className='loginButton' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login