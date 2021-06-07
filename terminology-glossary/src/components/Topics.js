import axios from 'axios'
import { useEffect , useState} from 'react'
import {useDispatch} from 'react-redux'


const Topics = (props) => {
    const unit_id = props.unit_id
    const dispatch = useDispatch()
    const [unitName, setUnitName] = useState([])
    useEffect(() => {
        axios.get(`/topics/${unit_id}`)
            .then((res) => {
                // console.log(res.data)
                setUnitName(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }, [dispatch, unit_id])


    return(
        <div className='topicSection'>
                {unitName.map((val) => {
                    return (
                            <div
                                className='topicList'
                                key={val.topic_id}>
                                <li>
                                    {val.topic_name}
                                </li>
                            </div>
                    )
                })}
        </div>
    )

}
export default Topics