import {Link} from 'react-router-dom'
// import {useSelector} from 'react-redux'

const Home = () => {

    return (
        <div className='border'>
            <div className='homeBorder'></div>
            <div className='homePage'>
                    <h1 className='homeWelcome'>Welcome to your<br></br>DevMountain Unit Glossary!</h1>
                    <div className='homeOptions'>
                        <Link to='/login'>
                            <button className='signUpButton'>Login/Sign Up</button>
                        </Link>
                        <Link to='/login'>
                            <button className='homeRegisterButton'>Learn More</button>
                        </Link>
                    </div>
            </div>
            <div className='homeBorder'></div>
        </div>
        
    )
}

export default Home