import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Home from "./Home";

function App() {
  return (
    <Router>
        <Route exact path="/" component={Home} />
    </Router>
  );

}

export default App;
