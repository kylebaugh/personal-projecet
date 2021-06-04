import axios from 'axios'
import {getAllUnits} from '../redux/glossaryReducer'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Topics from './Topics'

const Glossary = (props) => {
    const dispatch = useDispatch()
    const {units} = useSelector((state) => state.glossaryReducer)
    // const {user} = useSelector((state) => state.authReducer)

    useEffect(() => {
        axios.get('/glossary/getAllUnits')
            .then((res) => {
                // console.log(res.data)
                dispatch(getAllUnits(res.data))
            })
            .catch((err) => {
                console.log(err)
                console.log('topic unit failed')
            })
    }, [dispatch])

    return (
        <div className='glossaryPage'>
            <h1>Units Header</h1>
            {units.map((unit) => {
                return (
                        <section className='unitBox'
                        key={unit.unit_id}
                        id={unit.unit_id}
                        >
                            <Link to={`/unit/${unit.unit_id}`}>
                                <section className='unitName'>
                                    {unit.name}
                                </section>
                            </Link>
                            <Topics 
                            unit_id = {unit.unit_id}/>
                        </section>
                )
            })}
        </div>
    )
}

export default Glossary