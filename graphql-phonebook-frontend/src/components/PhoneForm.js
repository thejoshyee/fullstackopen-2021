
import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

export const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`

const PhoneForm = ({setError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
  
    const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
          setError('person not found')
        }
      }, [result.data])
  
    const submit = (event) => {
      event.preventDefault()
  
      changeNumber({ variables: { name, phone } })
  
      setName('')
      setPhone('')
    }
  
    return (
      <div>
        <h2>change number</h2>
  
        <form onSubmit={submit}>
          <div>
            name <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            phone <input
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
          <button type='submit'>change number</button>
        </form>
      </div>
    )
  }
  
  export default PhoneForm