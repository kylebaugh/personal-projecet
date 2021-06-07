import axios from 'axios'
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
                push('/')
                setTogglemenu(false)
                dispatch(clearUser())
                localStorage.removeItem('user_id')
            })
            .catch((err) => {
                console.log('Logout Endpoint Failed')
                console.log(err)
            })
    }

    const toHome = () => {
        push('/')
        setTogglemenu(false)
    }

    const toProfile = () => {
        push('/profile')
        setTogglemenu(!toggleMenu)
    }

    const toGlossary = () => {
        push('/glossary')
        setTogglemenu(!toggleMenu)
    }

    const toLogin = () => {
        push('/login')
        setTogglemenu(!toggleMenu)
    }

    return (
        <div>

            <div className='headerHeader'>
                    {user && <img className='headerIcon' onClick={() => {toProfile()}} src='https://mk0devmountainc07rxr.kinstacdn.com/wp-content/uploads/2020/10/devmountain-logo3.png' alt='DevMountainLogo'></img>}
                    {!user && <img className='headerIcon' onClick={() => {toHome()}} src='https://mk0devmountainc07rxr.kinstacdn.com/wp-content/uploads/2020/10/devmountain-logo3.png' alt='DevMountainLogo'></img>}
                <header className='headerHeader'>
                    <div className='headerMenu'>
                        <div className='shownMenu'>
                            {!user && <span className='headerMenuItem' onClick={() => {toHome()}}>Home</span>}
                            {user && <span className='headerMenuItem' onClick={() => {toProfile()}}>Profile</span>}
                            <span className='headerMenuItem' onClick={() => {toGlossary()}} >Units</span>
                            {!user && <span className='headerMenuItem' onClick={() => {toLogin()}} >Login</span>}
                            {user && <span className='headerMenuItem' onClick={() => {logout()}}>Logout</span>}
                        </div>
                        <span className='headerMenuIcon' style={{cursor:'pointer'}} onClick={() => setTogglemenu(!toggleMenu)}>Menu</span>
                    </div>
                </header>
            </div>

            <div>
                <header className='mobileHeader'>
                    {toggleMenu && <div className='mobileMenu'>
                        {!user && toggleMenu && <span className='mobileMenuItem' onClick={() => {toHome()}}>Home</span>}
                        {user && toggleMenu &&  <span className='mobileMenuItem' onClick={() => {toProfile()}}>Profile</span>}
                        {toggleMenu && <span className='mobileMenuItem' onClick={() => {toGlossary()}}>Units</span>}
                        {!user && toggleMenu && <span className='mobileMenuItem' onClick={() => {toLogin()}}>Login</span>}
                        {user && toggleMenu && <span className='mobileMenuItem' onClick={logout}>Logout</span>}
                    </div>}
                </header>
            </div>

        </div>
    )
}

export default Header