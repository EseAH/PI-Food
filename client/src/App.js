import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import CreateRecipe from './pages/Create/Create';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Switch>  //con SWITCH renderiza una pagina u otra, no nav + home */}
          <Route path="/" component={Nav}/>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/create" component={CreateRecipe}/>
        {/* </Switch> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
