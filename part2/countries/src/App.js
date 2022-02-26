import { useEffect, useState } from "react"
import axios from "axios"
import RenderCountriesList from "./components/RenderCountriesList"
import "./styles.css"


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState("")

  //filter the countries list and make case insensitive 
  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterQuery.toLowerCase()))
  
  //get country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setCountries(response.data)
        }
  )}, [])

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
        <RenderCountriesList filterQuery={filterQuery} countries={filteredCountries}/>
      </div>
    </div>
  );
}

export default App;
