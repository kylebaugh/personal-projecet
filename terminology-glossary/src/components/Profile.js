import axios from 'axios'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import AdminList from './AdminList'
import LearnList from './LearnList'

const Profile = (props) => {
    const {user} = useSelector((state) => state.authReducer)

    const [userItems, setUserItems] = useState([])

    useEffect(() => {
        axios.get(`/topics/userItems/${user.user_id}`)
            .then((res) => {
                setUserItems(res.data)
            })
            .catch(err => {
                console.log(err)
                console.log('Use effect failed')
            })
        }, [])


    return(
        <div className='border'>
            <div className='homeBorder'></div>
            <div className='profilePage'>
                <h1>{user.firstname}'s Profile</h1>
                
                <div style={{display:'flex'}}>

                    <div className='profilePagePic'>
                        <img src={user.picture} alt='User Profile Pic' style={{width:'20vw', height:'20vw'}} />
                        {user.admin ?? <section className='profileDetails'>
                            <p>Account Type: Administrator</p>
                            <p>Items Created: {userItems.length}</p>
                        </section>}
                        {!user.admin ?? <section className='profileDetails'>
                            <p>Account Type: User</p>
                            <p>Items Saved: </p>
                        </section>}
                    </div>
                    
                    <div style={{display:'flex', flexDirection:'column'}}>
                        {user.is_admin && <p className='termTop'>My Glossary Items</p>}
                        {!user.is_admin && <p className='termTop'>My Learning Items</p>}
                        {!user.is_admin && <button className='printButton'>Print Flashcards</button>}
                        {user.is_admin && <div>
                            <AdminList />
                        </div>}
                        {!user.is_admin && <div>
                            <LearnList />
                            </div>}
                    </div>
                </div>
                
            </div>

            <div className='homeBorder'></div>
        </div>
    )
}

export default Profile