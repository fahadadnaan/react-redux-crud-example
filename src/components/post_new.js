import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostNew extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `field ${error && touched ? "error" : ""}`;
    const classNameHeader = ` ${error && touched ? "ui error message" : ""}`;

    return (
      <div>
        <div className={className}>
          <label>{field.label}</label>
          <input type="text" {...field.input} />
        </div>
        <div className={classNameHeader}>
          <div>{field.meta.touched ? field.meta.error : ""}</div>
        </div>
      </div>
    );
  }

  onSubmit = formValues => {
   this.props.createPost(formValues, ()=>{
    this.props.history.push('/');
   });
  };

  render() {
    return (
      <div className="ui container ">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field label="Title" name="title" component={this.renderField} />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field label="Content" name="content" component={this.renderField} />
          <button className="ui button primary">Submit</button>
          <Link to="/" className="ui button ">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.categories) {
    errors.categories = "You must enter a categories";
  }
  if (!formValues.content) {
    errors.content = "You must enter a content";
  }
  return errors;
};

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostNew));
