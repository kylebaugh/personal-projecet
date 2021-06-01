import {useSelector} from 'react-redux'

const Profile = (props) => {
    const {user} = useSelector((state) => state.authReducer)


    return(
        <div>
            <section>{user.email}'s Profile Page</section>
            <img src='user.picture' alt='User Profile Pic' />
        </div>
    )
}

export default Profile