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
      <form className="max-w-sm" onSubmit={e => handleSubmit(e, comment.value)}>
        <div>
          <label htmlFor="username" />
          <input
            className="mb-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            placeholder="Your comment..."
            id="comment"
            type={comment.type}
            name={comment.name}
            value={comment.value}
            onChange={comment.onChange}
            required
          />
          <button
            className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            id="comment-submit"
            type="submit"
          >
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
