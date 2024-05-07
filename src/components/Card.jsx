/* eslint-disable react/prop-types */
import style from './Card.module.css'

export const Card = ({name, desc, categ, value, image, status}) => {
  return(
      <div className={style.card}>
        <div className={style.nameStatus}>
          <h1>{name}</h1>
          <div className={status ? style.bolinhaVerde : style.bolinhaVermelha} ></div>
        </div>
        <h2>{desc}</h2>
        <h4>{categ}</h4>
        <p>{value}</p>
        <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}