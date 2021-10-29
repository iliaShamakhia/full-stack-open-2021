import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';


const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState('all genres')

  if (!props.show) {
    return null
  }

  if(loading)return(<p>Loading...</p>)
  if(error)return(<p>Error</p>)

  let books = data.allBooks
  let allGenres = {'all genres':true}
  for(let b of books){
    for(let g of b.genres){
      if(g in allGenres){
        continue
      }else{
        allGenres[g] = true
      }
    }
  }
  if(genres!=='all genres')books = data.allBooks.filter(b => b.genres.includes(genres))
  
  
  return (
    <div>
      <h2>books</h2>
      <p> in genre <strong>{genres}</strong></p>
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
      <div>
        {
          Object.keys(allGenres).map(g => 
            <button key={g} onClick={()=>setGenres(g)}>{g}</button>
            )
        }
        
      </div>
    </div>
  )
}

export default Books