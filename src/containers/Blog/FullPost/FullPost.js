import React, { Component } from 'react';
import Axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state ={
        loadedPost : null
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.props.id !== this.state.loadedPost.id)) {
                Axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data })
                    })
            }

        }
    }

    postDeleteHandler = () =>{
        Axios.delete('/posts/' + this.props.id)
        .then(response => {
            // console.log(response);
        })
    }

    render () {
        // console.log(this.props.id)
        let post = <p style={{textAlign:'center'}}>Loading!!!!!</p>;
        if(this.props.id){
            post = <p style={{textAlign:'center'}}>Loading!!!!</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick = {this.postDeleteHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;