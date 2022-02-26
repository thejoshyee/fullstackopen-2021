import { useEffect, useState } from "react"
import axios from "axios"


function App() {
  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState("")

  //get country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setCountries(response.data.map(country => country.name.common)
      )}
  )}, [])


  //countries to show 
  const countriesToShow = countries.filter(country => {
    if (!filterQuery) {
      return false
    } else if (filterQuery && country.toLowerCase().includes(filterQuery.toLowerCase())) {
      return true
    }
  }).map((country, index) => {
    return <div key={index}>{country}</div>
  })

  //event handlers
  const onFilterQuery = e => setFilterQuery(e.target.value)
      

  return (
    <div>
      Find Countries: 
      <input
        placeholder="Country Name..." 
        value={filterQuery} 
        onChange={onFilterQuery}
      />

      <div>
        {/* {renderCountriesList(countries)} */}
        {countriesToShow}
      </div>
    </div>
  );
}

export default App;
