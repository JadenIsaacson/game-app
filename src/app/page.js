'use client'
import React, { useState, useEffect } from "react";
import Card from "./card";


const GameApp = () => {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState([])
  const [currentGenre, setCurrentGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(`https://api.rawg.io/api/games?page_size=20&key=6baabf7f718d4f7ab760eba791b74404`)
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  

  useEffect(() => {
    fetch(currentPage)
    .then(response => response.json())
    .then(data  => { 
      setList(data.results);
      setNextPage(data.next, window.scrollTo(0, 0))
      setPrevPage(data.previous, window.scrollTo(0, 0))
      console.log(data)
      })
  },[currentPage])


  const topHundredClick = () => {
      fetch(`https://api.rawg.io/api/games?page_size=40&key=${apiKey}`)
      .then(response => response.json())
      .then(data  => { 
        setList(data.results);
        setCurrentGenre(null)
        })
  }

  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${apiKey}`)
    .then(response => response.json())
    .then(data  => { 
      setGenre(data.results); 
      })
  },[])

  const handleGenreClick = (genre) => {
    fetch(`https://api.rawg.io/api/games?page_size=20&genres=${genre.id}&key=${apiKey}`)
    .then(response => response.json())
    .then(data  => { 
      setList(data.results);
      })
      setCurrentGenre(genre.name)
    }

  const apiKey = '6baabf7f718d4f7ab760eba791b74404'

  const handleSearch = () => {  
    fetch(`https://api.rawg.io/api/games?search=${search}&key=${apiKey}`)
    .then(response => response.json())
    .then(data  => { 
      setList(data.results) 
      }, [search])
  }

  const goToNextPage = () => {
    setCurrentPage(nextPage)
  }

  const goToPrevPage = () => {
    setCurrentPage(prevPage)
  }

  return (
    <>
    <div><h1>{!currentGenre ? 'Top 100 Games' : `${currentGenre} Games`}</h1></div>
    <div>
    </div>
    <div className="search-input">
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 512"
    height="40"
    width="45" >
      <path 
      d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/>
    </svg>&nbsp;
    <input placeholder="Search a game here..." onChange={(e) => handleSearch(setSearch(e.target.value))}  value={search}></input>
         </div>
         <div className="top-btn">
         <div className="top100" onClick={topHundredClick}>TOP 100</div>
         </div>
      <div className="game-body">
      
        <div className="genre-list">
          
        <h2>Genres</h2>
        {genre.map((item) => {
          return(
            <div key={item.id}>
            <ul className="genre-each">
            <img className="genre-image" src={item.image_background}></img> 
            <div onClick={() => handleGenreClick(item)} className="genre-name">{item.name}</div>
                        
            </ul>
            </div>
          )
        })}
        </div>

        <div className="game-list">
      {list?.map((game, id) => {
        return (
          <Card key={id} game={game} />
        )
      })}
      </div>
      </div>
      <div className="button-flex">
        <div className="top100" onClick={goToPrevPage}>Previous</div>
         <div className="top100" onClick={goToNextPage}>Next</div>         
         </div>
    </>
  )
};

export default GameApp;