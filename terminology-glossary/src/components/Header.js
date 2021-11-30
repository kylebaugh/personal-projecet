import axios from 'axios'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearUser} from '../redux/authReducer'
import dmLogo from '../assets/devLogo-removebg-preview.png'

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
                    {user && <img className='headerIcon' onClick={() => {toProfile()}} src={dmLogo} alt='DevMountainLogo'></img>}
                    {!user && <section class='newLogo'>
                            <img className='headerIcon' onClick={() => {toHome()}} src={dmLogo} alt='DevMountainLogo'></img>
                            <section class='newLogoText'>
                                <text class='logoText1'>D E V M O U N T A I N</text>
                                <text class='logoText2'>Part of Strayer University</text>
                            </section>
                        </section>}
                <div className='headerHeader2'>
                    <div className='headerMenu'>
                        <div className='shownMenu'>
                            {!user && <span className='headerMenuItem' onClick={() => {toHome()}}>Home</span>}
                            {user && <span className='headerMenuItem' onClick={() => {toProfile()}}>Profile</span>}
                            <span className='headerMenuItem' onClick={() => {toGlossary()}} >Units</span>
                            {!user && <span className='headerMenuItem' onClick={() => {toLogin()}} >Login</span>}
                            {user && <span className='headerMenuItem' onClick={() => {logout()}}>Logout</span>}
                        </div>
                        <div className='headerMenuIcon' onClick={() => setTogglemenu(!toggleMenu)}>
                            <div className='menuBox'>
                                <section className='menuLine'></section>
                                <section className='menuLine'></section>
                                <section className='menuLine'></section>
                            </div>
                            </div>
                    </div>
                </div>
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