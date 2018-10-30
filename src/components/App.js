import React, {Component} from 'react';
import Login from "./Login";
import Header from "./Header";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="app__header__padding"/>
                <Login/>
            </div>
        );
    }
}

export default App;
