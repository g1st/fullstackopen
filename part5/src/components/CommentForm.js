import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { sendComment } from '../store/actions/blogActions';
import { setNotification } from '../store/actions/notificationActions';

const CommentForm = ({ sendComment, id, timerId, setNotification }) => {
  const comment = useField('text', 'comment');

  const handleSubmit = async (event, comment) => {
    event.preventDefault();
    try {
      await sendComment(id, comment);
      setNotification(`Your comment has been added!`, '', timerId);
    } catch (e) {
      setNotification('Something went wrong...', 'error', timerId);
    }
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e, comment.value)}>
        <div>
          <label htmlFor="username" />
          <input
            id="comment"
            type={comment.type}
            name={comment.name}
            value={comment.value}
            onChange={comment.onChange}
            required
          />
          <button id="comment-submit" type="submit">
            add comment
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  timerId: state.notification.id
});

export default connect(mapStateToProps, { sendComment, setNotification })(
  CommentForm
);
