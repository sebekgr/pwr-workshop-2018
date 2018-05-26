import React from 'react';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';

const UsersByNameQuery = gql`
  query($name: String!) {
    usersByName(name: $name) {
      _id
      username
      avatar
      birthdate
    }
  }
`;

function UsersByNameRenderer({data, error, loading}) {
if (error) {
  return (
    <div className="ui negative icon message">
      <i className="exclamation icon" />
      <div className="header">
        An users-related error occurred :(
      </div>
    </div>
  );
}

if (loading) {
  return (
    <div className="ui active loader" />
  );
}

return (
  <div className="ui large relaxed divided list container">
    { data.usersByName.map(user => <UsersView user={user} />
    )}
  </div>
);
}

function UsersView({user}) {
  return (
    <div className="item" key={user._id}>
    <div className="header">
      id:&nbsp; {user.username}
    </div>
    <div className="content">
      avatar: <img src={user.avatar} alt="avatar" />
      <br />
      birthdate: {user.birthdate}
    </div>
    </div>
  );
}

export default function UsersByName({match: {params: {name}}}) {
  return (
    <Query query={UsersByNameQuery} variables={{name}}>
      {UsersByNameRenderer}
    </Query>
  );
}
