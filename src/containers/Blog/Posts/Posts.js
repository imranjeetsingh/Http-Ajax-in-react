import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

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
        this.setState({selectedId:id});
    }

    render() {
        let post = <p><strong>Something went wrong!!!</strong></p>
        if (!this.state.error) {
            post = this.state.posts.map(post => {
                return (
                    <Link to={'/'+post.id} key={post.id}>
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
            <section className="Posts">
                {post}
            </section>
        )
    }
}

export default Posts;