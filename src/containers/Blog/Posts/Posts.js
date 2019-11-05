import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import Axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts : [],
    }

    componentDidMount(){
        Axios.get('/posts/')
             .then(response =>{
                 const posts = response.data.slice(0,4);
                 const updatedData = posts.map(post=>{
                     return {
                         ...post,
                         author : "Ranjeet Singh"
                     }
                 })
                 this.setState({posts : updatedData})
             }).catch(error =>{
                // this.setState({error:true})
             })
    }

    postSelectionHandler = (id)=>{
        this.props.history.push({ pathname: '/posts/' + id });
    }

    render() {
        let post = <p><strong>Something went wrong!!!</strong></p>
        if (!this.state.error) {
            post = this.state.posts.map(post => {
                return (
                    <Link to={'/posts/'+post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectionHandler(post.id)}
                        />
                    </Link> 
                )
            })
            
        }
        return (
            <div>
            <section className="Posts">
                {post}
            </section>
            <Route path={this.props.match.url+'/:id'} exact component = {FullPost} />
            </div>
        )
    }
}

export default Posts;