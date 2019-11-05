import React, { Component } from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPosts from './NewPost/NewPost';
import FullPost from '../Blog/FullPost/FullPost';
import './Blog.css';

class Blog extends Component {
    
    render () {
        return (
            <div className="Blogs">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>
                                Posts
                                </NavLink>
                            </li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>NewPost</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home2</h1>} /> */}
                <Switch>
                    <Route path="/new-post" component = {NewPosts} />
                    <Route path="/posts" component = {Posts} />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;