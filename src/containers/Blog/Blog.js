import React, { Component } from 'react';
import Axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedId : null,
        error : false,
    }

    componentDidMount(){
        Axios.get('https://jsonplaceholder.typicode.com/posts')
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
                this.setState({error:true})
             })
    }

    postSelectionHandler = (id)=>{
        this.setState({selectedId:id});
    }

    render () {
        let post = <p><strong>Something went wrong!!!</strong></p>
        if(!this.state.error)
        {
            post = this.state.posts.map(post =>{
                return <Post 
                        key = {post.id} 
                        title = {post.title} 
                        author= {post.author}
                        clicked = {()=>this.postSelectionHandler(post.id)}
                        />
            })
        }
        return (
            <div>
                <section className="Posts">
                   {post}
                </section>
                <section>
                    <FullPost id = {this.state.selectedId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;