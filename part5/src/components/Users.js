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
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user, i) => (
                <tr key={i} className={i % 2 !== 0 ? 'bg-gray-200' : ''}>
                  <td className="border px-4 py-2">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td className="border px-4 py-2">{user.blogs.length}</td>
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
