import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import { Link } from 'react-router-dom';
import _ from "lodash";

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <div className="card" key={post.id}>
          <div className="content">
          <i className="right floated remove icon"></i>
          <Link to={ `/posts/${post.id}` }>
           <i className="right floated eye icon"></i>
           </Link>
            <div className="header">{post.title}</div>
            <div className="meta">{post.categories}</div>
            <div className="description">{post.content}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui container">
      <Link to="/post/new" className="right floated ui blue basic button">Add a Post</Link>
        <h3>Posts</h3>
        <div className="ui cards">{this.renderPosts()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
