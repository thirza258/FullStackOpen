import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState(null)
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState('')
  
  const allCountries =  
  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setValue(event.target.value);

    if (searchTerm.length === 0) {
      setCountries([]);
      setFlag('');
      setLanguages({});
      return;
    }

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        let data = [];
        response.data.forEach(element => {
          if (element.name.common.toLowerCase().includes(searchTerm)) {
            data.push(element.name.common);
          }
        });

        if (data.length > 10) {
          setCountries(['Too many matches, specify another filter']);
        } else if (data.length <= 10 && data.length !== 1) {
          setCountries(data);
          setFlag('');
          setLanguages({});
        } else if (data.length === 1) {
          setCountries(data);
          axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${data[0]}`)
            .then(response => {
              console.log(response.data); // Log response data to understand its structure
              const country = Array.isArray(response.data) ? response.data[0] : response.data;
              setFlag(country.flags.png);
              setLanguages(country.languages);
            })
            .catch(error => {
              console.error('Error fetching country details:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <div>
        {countries.length === 1 && flag ? (
          <div>
            <h1>{countries[0]}</h1>
            <img src={flag} alt={`Flag of ${countries[0]}`} style={{ width: '200px' }} />
            <h3>Languages:</h3>
            <ul>
              {Object.values(languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        ) : (
          <ul>
            {countries.map((country, index) => (
              <li key={index}>{country}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App