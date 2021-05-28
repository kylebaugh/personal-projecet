import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className='homeHeader'>
            <h1>Home Header</h1>
            <div>
                <h1>Welcome to your DevMountain Glossary!</h1>
                <div>
                    <Link to='/login'>
                        <button>Login/Sign Up</button>
                    </Link>
                    <Link to='/learnMore'>
                        <button>Learn More</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home