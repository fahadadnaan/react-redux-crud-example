import React, { Component } from "react";
import { connect } from "react-redux";
import { showPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.showPost(id);
  }

  onDeleteClick = () =>{
    const { id } = this.props.match.params;
   this.props.deletePost(id, () => {
       this.props.history.push('/');
   });
  }



  render() {
      const { post } = this.props;
      if (!post) {
          return <div>loading ....</div>
      }
    return (
        <div className="ui container">
        <Link to="/">Back</Link>
           <div className="content">
           <div className="ui card">
           <h3>{post.title}</h3>
           <h6>Categories: {post.categories}</h6>
           <p>{post.content}</p>
           <button className="ui bottom attached button red"
           onClick={this.onDeleteClick}>
      <i className="remove icon"></i>
     Delete Post
    </button>
           </div>
           </div>
        </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { showPost, deletePost })(PostShow);
