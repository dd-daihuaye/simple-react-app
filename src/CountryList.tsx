import React from 'react';
import { gql, useQuery } from '@apollo/client';

const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

const CountryList: React.FC = () => {
  const { data, loading, error } = useQuery(COUNTRIES_QUERY);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries.map((c: { code: string; name: string; emoji: string }) => (
        <li key={c.code}>
          {c.emoji} {c.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
