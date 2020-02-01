import React from 'react';
import { connect } from 'react-redux';
import NewBlogForm from './NewBlogForm';
import Blogs from './Blogs';

const Landing = ({ user }) => {
  return (
    user && (
      <>
        <NewBlogForm />
        <Blogs />
      </>
    )
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Landing);
