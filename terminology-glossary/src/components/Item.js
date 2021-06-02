import axios from 'axios'
// import {getUnit} from '../redux/glossaryReducer'
import {useState} from 'react'
import {useSelector} from 'react-redux'

const Item = (props) => {
    const {user} = useSelector((state) => state.authReducer)

    const [newItemName, setNewItemName] = useState('')
    const [newItemDefinition, setNewItemDefinition] = useState('')
    const [editBox, setEditBox] = useState(false)

    const item = props.item

    const toggleEdit = (glossary_id) => {
        setEditBox(!editBox)
    }

    const deleteItem = (glossary_id) => {
        axios.delete(`/unit/deleteItem/${glossary_id}`)
            .then((res) => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => console.log('Delete Item Failed'))
    }

    const editItem = (glossary_id, name, definition) => {
        axios.put(`/unit/editItem/${glossary_id}`, 
            {glossary_id: glossary_id,
            name: newItemName, 
            definition: newItemDefinition, 
            unit_id: props.unitId})
        .then((res) => {
            console.log(res.data)
            window.location.reload()
        })
        .catch(err => console.log('Edit Item Failed'))
    }

    return(
        <div className='itemBox'>
                        <div>
                            <div className='unitName'>Title: {item.name}</div>
                            <br></br>
                            <div className='unitDefinition'>Definition: {item.definition}</div>
                            <br></br>
                        </div>
                        {user && <div>
                            <button onClick={() => {toggleEdit(item.glossary_id)}}>Edit</button>
                            <button 
                                onClick={() => deleteItem(item.glossary_id)}
                                >Delete</button>
                                {editBox && <div>
                                    <input placeholder="New Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)}></input>
                                    <input placeholder="New Definition" value={newItemDefinition} onChange={(e) => setNewItemDefinition(e.target.value)}></input>
                                    <button onClick={toggleEdit}>Cancel</button>
                                    <button onClick={() => editItem(item.glossary_id)}>Submit</button>
                                    </div>}
                        </div>}
                    </div>
    )

}

export default Item