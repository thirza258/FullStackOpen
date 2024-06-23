import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const found = response.data.find(
            (country) => country.name.common.toLowerCase() === name.toLowerCase()
          );
          if (found) {
            setCountry({ found: true, data: found });
          } else {
            setCountry({ found: false });
          }
        })
        .catch(() => {
          setCountry({ found: false });
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>capital {country.data.capital}</div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    found: PropTypes.bool,
    data: PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired
      }).isRequired,
      capital: PropTypes.arrayOf(PropTypes.string).isRequired,
      population: PropTypes.number.isRequired,
      flag: PropTypes.string.isRequired
    })
  })
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
