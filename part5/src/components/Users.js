import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userService from '../services/userService';

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    user && (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Users);
