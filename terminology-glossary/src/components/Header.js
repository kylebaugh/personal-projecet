import axios from 'axios'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearUser} from '../redux/authReducer'

const Header = (props) => {
    const [toggleMenu, setTogglemenu] = useState(false)

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
                console.log(err)
            })
    }


    return (
        <div>

        <div className='headerHeader'>
                <img href='http://localhost:3000/#/' className='headerIcon' src='https://mk0devmountainc07rxr.kinstacdn.com/wp-content/uploads/2020/10/devmountain-logo3.png' alt='DevMountainLogo'></img>
            <header className='headerHeader'>
                <div className='headerMenu'>
                    <div className='shownMenu'>
                        {!user && toggleMenu && <Link to='/' className='headerMenuItem'>Home</Link>}
                        {user && toggleMenu &&  <Link to='/profile' className='headerMenuItem'>Profile</Link>}
                        {toggleMenu && <Link to='/glossary' className='headerMenuItem'>Units</Link>}
                        {!user && toggleMenu && <Link to='/login' className='headerMenuItem'>Login</Link>}
                        {user && toggleMenu && <Link to ='/' className='headerMenuItem' onClick={logout}>Logout</Link>}
                    </div>
                    <span className='headerMenuItem' style={{cursor:'pointer'}} onClick={() => setTogglemenu(!toggleMenu)}>Menu</span>
                </div>
            </header>
            
        </div>

        </div>
    )
}

export default Header