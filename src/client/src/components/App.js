import React from 'react';
import axios from 'axios';
class App extends React.Component{
    componentDidMount() {
        axios.get(`/api/getUsername`)
                .then((response)=>{
                    console.log(response)
                })
                .catch(error=>{console.log(error)})
       
    }
    render() {
        return (
            <div>Hello World</div>
        )
    }
}

export default App;