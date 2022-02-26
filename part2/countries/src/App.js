import { useEffect, useState } from "react"
import axios from "axios"


function App() {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState("")

  //get country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setCountries(response.data.map(country => country.name.common)
      )}
  )}, [])

  console.log(countries)

  //filtered data
  // let filteredCountryData = countries.filter(country => {
  //   return country.name.toLowerCase().includes(filterCountry.toLowerCase())
  // })


  //Render Country

  // const renderCountriesList =  ( countries ) => {
  //   if (countries.length > 10) {
  //     return <p>Too many results. Please Try again...</p>
  //   } else {
  //     return (
  //       countries.map((country) => <div key={country.numericCode}> {country.name} </div>)
  //     )
  //   }
  // }


  //event handlers
  const handleFilterCountry = e => setFilterCountry(e.target.value)


  return (
    <div>
      Find Countries: 
      <input
        placeholder="Country Name..." 
        value={filterCountry} 
        onChange={handleFilterCountry}
      />

      <div>
        {/* {renderCountriesList} */}
      </div>
    </div>
  );
}

export default App;
