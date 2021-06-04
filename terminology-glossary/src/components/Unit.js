import axios from 'axios'
import {getUnit} from '../redux/glossaryReducer'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Item from './Item'

const Unit = (props) => {
    const dispatch = useDispatch()
    const {unit} = useSelector((state) => state.glossaryReducer)
    const {user} = useSelector((state) => state.authReducer)

    const [newItemName, setNewItemName] = useState('')
    const [newItemDefinition, setNewItemDefinition] = useState('')
    const [addItemBox, setAddItemBox] = useState(false)
    
    useEffect(() => {
        axios.get(`/glossary/${props.match.params.unit_id}`)
            .then((res) => {
                dispatch(getUnit(res.data))
            })
            .catch((err) => {
                console.log('Unit Use Effect Failed')
            })
    }, [props, dispatch])
    
    const handleAdd = () => {
        setAddItemBox(!addItemBox)
    }
    
   const addItem = (userId, itemName, itemDefinition, unitId) => {
        axios.post('/unit/addItem', {user_id: user.user_id, name: newItemName, definition: newItemDefinition, unit_id: props.match.params.unit_id})
        .then((res) => {
            window.location.reload()
        })
        .catch(err => console.log('Add Item Function Failed'))
    }

    return (
        <div className='unitPage'>
            <h1 className='glossaryPageName'>Unit {props.match.params.unit_id}</h1>
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
                let id = item.glossary_id
                return (
                    <Item 
                    key={id}
                    unitId = {props.match.params.unit_id}
                    item = {item}
                    />
                    )
                })
            }
        </div>
    )
}

export default Unit