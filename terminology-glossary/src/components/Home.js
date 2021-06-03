import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className='homePage'>
                <h1 className='homeWelcome'>Welcome to your DevMountain Glossary!</h1>
                <div className='homeOptions'>
                    <Link to='/login'>
                        <button className='signUpButton'>Login/Sign Up</button>
                    </Link>
                    <Link to='/learnMore'>
                        <button className='homeRegisterButton'>Learn More</button>
                    </Link>
                </div>
        </div>
    )
}

export default Home