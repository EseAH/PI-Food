import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import styles from './Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const recipeDetail = useSelector(state => state.detail)

    return (
        <>
        <div >
            {recipeDetail.length > 0 ?
            <div className={styles.container}>
                <h1>{recipeDetail[0].title}</h1>
                <img className="imgDetail" src={recipeDetail[0].image} alt='recipe' />
                <p>DIETS TYPES: {recipeDetail[0].diets}</p>
                <p>SUMMARY: {recipeDetail[0].summary}</p>
                <p>HEALTH SCORE: {recipeDetail[0].healthScore}</p>
                <p>STEPS: {recipeDetail[0].steps.map(e => {
                    return (
                        <li>{e}</li>
                    )
                })}</p>
            </div>
            :
            <div>
                <h3>Loading...</h3>
            </div>
            }
        </div>
        </>
    );
}
