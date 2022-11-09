import React, {Fragment, useEffect, useState} from "react"
import { useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom"
import { getDiets, getRecipes, sortAz, sortByDiet, sortByScore } from "../../redux/actions"
import Card from "../Card/Card"
import Paginado from "../Paginate/Paginate"
import styles from "./Cards.module.css"
import loadingImg from "../../images/4vsk.gif"

export default function Cards() {

  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
  const allDiets = useSelector(state => state.diets)
  //---------------------------------------------
  const [currentPage, setCurrentPage] = useState(1) // pagina actual, setee pag act. Pagina 1
  const [items, _setItems] = useState(9) // card por pagina (9)
  const indexLastCard = currentPage * items // 9 indice de la ult card de la pag
  const indexFirstCard = indexLastCard - items // 0 indice de la primer card de la pag
  const currentCards = allRecipes.slice(indexFirstCard, indexLastCard)
  
  const [order, setOrder] = useState('')

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
  //---------------------------------------------

  
  function handleClick(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(getRecipes())
  }

  function handleSort(e) {
    dispatch(sortAz(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }
  function handleSortDiet(e) {
    dispatch(sortByDiet(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`)
  }

  function handleSortScore(e) {
    dispatch(sortByScore(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`)
  }

  useEffect(()=>{
    dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch])


  return (
    <>
      <h1>RECIPES</h1>
      <button className={styles.reload} onClick={(e)=>{handleClick(e)}}>RELOAD RECIPES</button>
      <div>
        <select onChange={(e)=>handleSort(e)}>
          <option hidden selected>select order</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
      <div>
        <select onChange={(e)=>handleSortScore(e)}>
          <option hidden selected>select score</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <select defaultValue="all" id="diets" onChange={(e)=>handleSortDiet(e)}>
          <option hidden selected>select diet</option>
          {/* <option value="all">All</option>
          <option value="gluten free">GLUTEN FREE</option>
          <option value="dairy free">DAIRY FREE</option>
          <option value="lacto ovo vegetarian">LACTO-OVOVEGETARIAN</option>
          <option value="vegan">VEGAN</option>
          <option value="whole 30">WHOLE30</option>
          <option value="paleolithic">PALEOLITHIC</option>
          <option value="primal">PRIMAL</option>
          <option value="pescatarian">PESCATARIAN</option>
          <option value="ketogenic">KETOGENIC</option>
          <option value="fodmap friendly">LOW FODMAP</option>
          <option value="vegetarian">VEGETARIAN</option> */}
          {allDiets?.map((d)=> (
            <option key={d.id} value={d.name}>{d.name}</option>
            ))}
        </select>
      </div>
      <Paginado
        items={items}
        allRecipes={allRecipes.length}
        paginado={paginado} 
      />
      <div className={styles.container}>
        {
          currentCards.length ? (
            currentCards.map(recipe => {
              return (
                <div>
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                      <Card
                          title={recipe.title}
                          image={recipe.image}
                          diets={recipe.diets}
                          key={recipe.id}
                      />
                  </Link>
                </div>)
            })
          ) : (
            <div>
              <h3>Loading...</h3>
              <img alt="loading" src={loadingImg} height="80px" id="img" />
            </div>
          )
        }
      </div>
    </>
  )
}
