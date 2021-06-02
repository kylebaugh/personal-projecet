import axios from 'axios'
import {useSelector} from 'react-redux'

const Profile = (props) => {
    const {user} = useSelector((state) => state.authReducer)


    return(
        <div>
            <h1>{user.firstname}'s Profile Page</h1>
            <div style={{display:'flex', gap:'20px', paddingRight:'25px', paddingLeft:'25px'}}>
                <img src={user.picture} alt='User Profile Pic' />
               {user.is_admin && <section>{user.firstname}'s Glossary Items</section>}
               {!user.is_admin && <section>{user.firstname}'s Learning Items</section>}
            </div>
        </div>
    )
}

export default Profile