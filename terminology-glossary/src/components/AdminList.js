import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

const AdminList = (props) => {
    const {user} = useSelector((state) => state.authReducer)
    // const [userItems, setUserItems] = useState([])

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

    return (
        <div>
            {user.is_admin && <div className='myTerms'>
            {userItems.map((item)=> {
                return(
                    <div
                    key={item.user_item_id}
                    >
                        {item.name}
                    </div>
                )
            })}
            </div>}
        </div>
    )

}

export default AdminList