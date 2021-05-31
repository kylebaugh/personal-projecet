import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearUser} from '../redux/authReducer'

const Header = (props) => {
    let dispatch = useDispatch()
    const {user} = useSelector((store) => store.authReducer)
    const {push} = useHistory()
    const logout = () => {
        axios.get('/auth/logout')
            .then(() => {
                dispatch(clearUser())
                localStorage.removeItem('user_id')
                push('/')
            })
            .catch((err) => {
                console.log('Logout Endpoint Failed')
                console.log(user)
            })
    }

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <header className='header'>Logo</header>
            <header className='header'>
                <div>
                    <Link to='/' style={{paddingLeft:20}}>Home</Link>
                    <Link to='/glossary' style={{paddingLeft:20}}>Glossary</Link>
                    {!user && <Link to='/login' style={{paddingLeft:20}}>Login</Link>}
                    {user && <Link to ='/' onClick={logout} style={{paddingLeft:20}}>Logout</Link>}
                </div>
            </header>

        </div>
    )
}

export default Header