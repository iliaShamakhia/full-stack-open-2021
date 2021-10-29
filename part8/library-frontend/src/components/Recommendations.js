import React, { useEffect, useState } from 'react'
import { useQuery,useLazyQuery } from '@apollo/client';
import { ALL_BOOKS2, ME } from '../queries';

const Recommendations = (props) => {
  const [gen,setGen] = useState()
  const [loadResult, result] = useLazyQuery(ALL_BOOKS2,{
    variables: { genre: gen }
  })
  const {error,data} = useQuery(ME)
  useEffect(() => {
    if(data){
      setGen(data.me.favoriteGenre)
    }
    loadResult()
  }, [loadResult,data])

  if (!props.show) {
    return null
  }
  
  if(!result.called || result.loading)return(<p>Loading...</p>)
  if(error)return(<p>Error</p>)
  
  const books = result.data.allBooks

  return(
    <div>
    <h2>recommendations</h2>
    <p> books in your favorite genre <strong>{gen}</strong></p>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  )
}

export default Recommendations