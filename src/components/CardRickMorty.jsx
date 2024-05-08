/* eslint-disable react/prop-types */
import style from './CardRickMorty.module.css'

export const CardRickMorty = ({name, status, species, gender, type, image}) => {
  return(
      <div className={style.card}>
        <h1>{name}</h1>
        <h2>{species}</h2>
        <h3>{status}</h3>
        <h4>{gender}</h4>
        <h5>{type}</h5>
        <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}