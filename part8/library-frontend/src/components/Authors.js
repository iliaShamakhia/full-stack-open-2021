import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR,ALL_AUTHORS } from '../queries';


const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState(0)

  const [ changeYear ] = useMutation(EDIT_BIRTHYEAR,{
    refetchQueries: [ ALL_AUTHORS ]
  })
  
  if (!props.show) {
    return null
  }

  if(loading)return(<p>Loading...</p>)
  if(error)return(<p>Error</p>)

  const authors = data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    changeYear({ variables: { name, setBornTo:Number(born) } })
    
    setName('')
    setBorn(0)
    
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option defaultValue="choose an author" value="choose an author">choose an author</option>
            {authors.map(a => 
              <option key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
