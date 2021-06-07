import './App.css';
import './phoneScreen.css'
import Header from "./components/Header"
import routes from "./routes"
import {setUser} from './redux/authReducer'
import {useDispatch} from 'react-redux'

function App() {
  let dispatch = useDispatch()
  if(localStorage.getItem('user_id')){
    try{
      dispatch(setUser(JSON.parse(localStorage.getItem('user_id'))))
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      <section className='appHeader'></section>
      <Header />
      {routes}
      <section className='appFooter'></section>
    </div>
  );
}

export default App;
