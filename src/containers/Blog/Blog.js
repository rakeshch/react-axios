import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state={
        posts:[],
        selectedPostId: null,
        errorShown: false
    }

    componentDidMount(){
        axios.get('/posts')
                .then(response=>{
                    //console.log(response);
                    //read only first 4 objects from the array starting from index 0
                    const posts = response.data.slice(0,4);
                    // adding new property to every post while adding existing properties as well
                    const updatedposts = posts.map(post=>{
                        return {
                            ...post,
                            author:'Rick'
                        }
                    });
                    this.setState({ posts: updatedposts});
                }).catch(error=> {
                    //console.log(error);
                    this.setState({errorShown: true});
                });
    }

    postClickedHandler=(id)=>{
       this.setState({ selectedPostId: id });
    };

    render () {
        let posts = <p style={{textAlign: "center"}}>Something went wrong</p>
         
        if(!this.state.errorShown){
            posts = (
            this.state.posts.map(post => {
                return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={()=>this.postClickedHandler(post.id)}></Post>
            })
        );
        
        }

        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;