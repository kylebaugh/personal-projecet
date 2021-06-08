import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

const LearnList = (props) => {
    const {user} = useSelector((state) => state.authReducer)
    const [learnList, setLearnList] = useState([])


    useEffect(() => {
        axios.get(`/topics/learnList/${user.user_id}`)
            .then((res) => {
                setLearnList(res.data)
            })
            .catch(err => {
                console.log(err)
                console.log('Use effect failed')
            })
        }, [user.user_id])

    const handleRemove = (glossary_id) => {
        axios.delete(`/topics/learnList/${glossary_id}`)
            .then((res => {
                console.log("yay")
                window.location.reload()
            }))
            .catch(err => {
                console.log(err)
                console.log('remove failed')
            })
    }

    return (
        <div>
            {user && <div className='myTerms'>
            <h3 className='termTop'>My Learning Items</h3>
            {learnList.map((items)=> {
                return(
                    <div
                    key={items.user_item_id}
                    >
                        <div className='termSpace'>
                            <section>
                                {items.name}
                            </section>
                            <section>
                                <button
                                onClick={() => {handleRemove(items.glossary_id)}}
                                >Remove</button>
                            </section>
                        </div>
                    </div>
                    
                )
            })}
            </div>}
        </div>
    )

}

export default LearnList