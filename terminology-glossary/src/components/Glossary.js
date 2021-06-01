import axios from 'axios'
import {getAllUnits} from '../redux/glossaryReducer'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

const Glossary = (props) => {
    const dispatch = useDispatch()
    const {units} = useSelector((state) => state.glossaryReducer)
    // const {user} = useSelector((state) => state.authReducer)

    useEffect(() => {
        axios.get('/glossary/getAllUnits')
            .then((res) => {
                console.log(res.data)
                dispatch(getAllUnits(res.data))
            })
            .catch((err) => {
                console.log('Use Effect Failed')
                console.log(err.response.status)
            })
    }, [dispatch])

    const handleClick = () => {
        console.log('clicky')
    }

    return (
        <div>
            <h1>Glossary Header</h1>
            {units.map((unit) => {
                return (
                    <div key={unit.unit_id}
                    id={unit.unit_id}
                    >
                        <section className='unitBox'
                        >
                            <Link to={`/unit/${unit.unit_id}`}>
                                <section 
                                    className='unitName'
                                    onClick={handleClick} 
                                    >{unit.name}
                                </section>
                            </Link>
                        </section>
                    </div>
                )
            })}

        </div>
    )
}

export default Glossary