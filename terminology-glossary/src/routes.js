import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Glossary from './components/Glossary'
import Unit from './components/Unit'
import Login from './components/Login'
import LearnMore from './components/LearnMore'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/glossary' component={Glossary} />
        <Route path='/unit/:unit_id' component={Unit} />
        <Route path='/login' component={Login} />
        <Route path='/learnMore' component={LearnMore}/>
    </Switch>
)

