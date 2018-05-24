import React from 'react';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';

const ExampleQuery = gql`
  query($input: Int!) {
    examples(input: $input) {
      answer
      ok
      time
    }
  }
`;

function ExampleRenderer({data, error, loading}) {
  if (error) {
    return (
      <div className="ui negative icon message">
        <i className="exclamation icon" />
        <div className="header">
          An error occurred :(
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
      {data.examples.map(example =>
        <div className="item" key={example.answer}>
          <div className="header">
            Answer:&nbsp;
            <Link to={`/example/${example.time}`}>
              {example.answer}
            </Link>
          </div>
          <div className="content">
            OK: {example.ok ? 'Yes' : 'No'}
            <br />
            Time: {example.time}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Example({match: {params: {input}}}) {
  return (
    <Query query={ExampleQuery} variables={{input}}>
      {ExampleRenderer}
    </Query>
  );
}
