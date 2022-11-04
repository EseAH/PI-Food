import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Cards from '../../components/Cards/Cards'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.Home}>
      <SearchBar></SearchBar>
      <Cards></Cards>
    </div>
  )
}
