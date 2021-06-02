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
        <div>

        <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'white', paddingTop:'10px', paddingBottom:'10px'}}>
            {/* <header className='header'>Logo</header> */}
            <img className='header' src='https://mk0devmountainc07rxr.kinstacdn.com/wp-content/uploads/2020/10/devmountain-logo3.png' alt='DevMountainLogo'></img>
            <header className='header'>
                <div>
                    {!user && <Link to='/' style={{paddingLeft:20}}>Home</Link>}
                    {user && <Link to='/profile' style={{paddingLeft:20}}>Profile</Link>}
                    <Link to='/glossary' style={{paddingLeft:20}}>Glossary</Link>
                    {!user && <Link to='/login' style={{paddingLeft:20}}>Login</Link>}
                    {user && <Link to ='/' onClick={logout} style={{paddingLeft:20}}>Logout</Link>}
                </div>
            </header>
            
        </div>

        </div>
    )
}

export default Header