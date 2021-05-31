import axios from 'axios'
import {getUnit} from '../redux/glossaryReducer'
// import {addButton} from '../redux/unitReducer'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

const Unit = (props) => {
    const dispatch = useDispatch()
    const {unit} = useSelector((state) => state.glossaryReducer)
    const {user} = useSelector((state) => state.authReducer)
    // const userId = user.user_id
    // const unitId = unit.unit_id

    const [newItemName, setNewItemName] = useState('')
    const [newItemDefinition, setNewItemDefinition] = useState('')
    const [addItemBox, setAddItemBox] = useState(false)
    
    useEffect(() => {
        console.log(props)
        axios.get(`/glossary/${props.match.params.unit_id}`)
            .then((res) => {
                // console.log(res.data)
                dispatch(getUnit(res.data))
            })
            .catch((err) => {
                console.log('Unit Use Effect Failed')
                // console.log(err.rersponse.status)
            })
    }, [props])
    
    const handleAdd = () => {
        setAddItemBox(!addItemBox)
    }
    
    const addItem = (userId, itemName, itemDefinition, unitId) => {
        axios.post('/unit/addItem', {user_id: user.user_id, name: newItemName, definition: newItemDefinition, unit_id: props.match.params.unit_id})
        .then((res) => {
            console.log(res.data)
            // window.location.reload()
        })
        .catch(err => console.log('Add Item Function Failed'))
    }
    
    return (
        <div>
            <h1>Unit {props.match.params.unit_id}</h1>
            {user && <button onClick={handleAdd}>Add Item</button>}
            {addItemBox && 
                <div>
                    <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder='Name'/>
                    <input value={newItemDefinition} onChange={(e) => setNewItemDefinition(e.target.value)} placeholder='Description'/>
                    <button 
                    onClick={addItem}
                    >Submit</button>
                </div>}
            {unit.map((item) => {
                // console.log(item)
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