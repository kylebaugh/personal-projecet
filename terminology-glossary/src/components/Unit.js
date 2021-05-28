import axios from 'axios'
import {getUnit} from '../redux/glossaryReducer'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

const Unit = (props) => {
    const dispatch = useDispatch()
    const {unit} = useSelector((state) => state.glossaryReducer)
    const {user} = useSelector((state) => state.authReducer)

    
    useEffect(() => {
        console.log(props)
        axios.get(`/glossary/${props.match.params.unit_id}`)
            .then((res) => {
                console.log(res.data)
                dispatch(getUnit(res.data))
            })
            .catch((err) => {
                console.log('Unit Use Effect Failed')
                // console.log(err.rersponse.status)
            })
    }, [dispatch, props])

    const addItem = () => {}

    return (
        <div>
            <h1>Unit {props.match.params.unit_id}</h1>
            {user && <button>Add Item</button>}
            {unit.map((item) => {
                console.log(item)
                let id = item.glossary_id
                return (
                    <div key={id} className='unitBox'>
                        <div>
                            <section className='unitName'>{item.name}</section>
                            <section className='unitDefinition'>{item.definition}</section>
                        </div>
                        {user && <div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>}
                    </div>
                )
            })
            }
        </div>
    )
}

export default Unit