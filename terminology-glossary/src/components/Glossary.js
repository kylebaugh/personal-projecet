import axios from 'axios'
import {getAllUnits} from '../redux/glossaryReducer'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Topics from './Topics'
import Header from './Header'

const Glossary = (props) => {
    const dispatch = useDispatch()
    const {units} = useSelector((state) => state.glossaryReducer)

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
        <div class='glossaryBackground'>
            <Header />
            <div className='glossaryPage'>
                <h1 style={{color:'white'}}>Unit Breakdown</h1>
                {units.map((unit) => {
                    return (
                        <div className='unitBox'
                        key={unit.unit_id}
                        id={unit.unit_id}
                        >
                                <Link to={`/unit/${unit.unit_id}`} className='unitLink'>
                                    <section className='unitName'>
                                        {unit.name} Topics
                                    </section>
                                    <br></br>
                                </Link>
                                    <Topics 
                                    unit_id = {unit.unit_id}/>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Glossary