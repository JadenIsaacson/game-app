'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
const Details = () => {
    const [game, setGame] = useState(null)
    const [photo, setPhoto] = useState([])
    const searchParams = useSearchParams()
  const id = searchParams.get('id')
  useEffect(() => {
    const getData = async () => {
       await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setGame(data)
          })
    }
    getData()
  },[id])

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`)
    .then(response => response.json())
    .then(data  => { 
      setPhoto(data.results); 
      })
  },[])
  const apiKey = '6baabf7f718d4f7ab760eba791b74404'

  const findDate = () => {
    let date = game.released
    date = date.split('-').map(e => e[0] == '0' ? e.slice(1) : e);
    date = date[1] + '/' + date[2] + '/' + date[0]
    return (
        date
    )
  } 

if (!game) return null

    return(
        <>
        <div className="home-btn">
            <Link className="home-link" href='/'>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="30"
            width="30"
            viewBox="0 0 576 512">
                <path 
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                </svg>  
            </Link>
        </div>
        <div className="details-container">
            <h1>{game.name}</h1>
            <div className="columns-container">
            <div className="column1">
            
            <div><img className="game-cover" src={game.background_image}/></div>
            <div className="info-flex">
            <div>
                <h3>Available on:</h3> {game?.platforms?.map((item, i) => {
                    return (
                    <li key={i}>{item.platform.name}</li>
                    )
                })}
                
            </div>
            <div>
                <h3>Genres:</h3>
                {game.genres.map((item, i) => {
                    return (
                    <li key={i} >{item.name}</li>
                    )
                })}
               
            </div>
            </div>
            <div className="score-release">
                <div>
                   <h3> Metacritic Score:</h3> {game.metacritic}
                </div>
            <div><h3>Released:</h3>{findDate()}</div>
            </div>
            </div>
            <div className="column2">
            <p className="game-description">{game.description_raw}</p>
                <div>
                {photo.map((pic, i) => {
                    return (
                        <img className="game-photos" height='130' weight='130' key={i} src={pic.image}></img>
                    )
                })}
                </div>
                
                </div>
                </div>
        </div>
                        <div>
                        <h3 className="web-link">Official Website:  
                        <Link target="_blank" onClick={() => window.open(game.website)} href={game.website}>{game.website}</Link></h3> 
                    </div>
    </>
    )
}
export default Details;