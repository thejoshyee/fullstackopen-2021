import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log(country)

  useEffect(() => {
    if (name) {
      axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        setCountry({
          data: response.data[0],
          found: true
        })
      })
      .catch(e => {
        setCountry({
          found: false
        })
      })
    }
  }, [name])

  return country
}


const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>population {country.data.population}</div> 
      <div>capital {country.data.capital[0]}</div>
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
