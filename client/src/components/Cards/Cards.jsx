import React, {Fragment, useEffect, useState} from "react"
import { useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom"
import { getRecipes } from "../../redux/actions"
import Card from "../Card/Card"
import styles from "./Cards.module.css"


export default function Cards() {

  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
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

  useEffect(()=>{
    dispatch(getRecipes())
  }, [dispatch])

  return (
    <>
      <h1>Cards</h1>
      <button>RELOAD RECIPES</button>
      <div className={styles.container}>
        {
          currentCards.length ? (
            currentCards.map(recipe => {
              return (
                <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                    <Card
                        title={recipe.title}
                        image={recipe.image}
                        diets={recipe.diets}
                        id={recipe.id}
                    />
                </Link>)
            })
          ) : (
            <h3>Loading...</h3>
          )
        }
      </div>
    </>
  )
}
