import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/ingredientType"
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ingredientCard.module.scss'

const IngredientCard = ({ options, onIngredientClick, ingredientsList, handleClickShowDetails }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let new_count = ingredientsList.filter(el => el._id === options._id).length;
    setCount(new_count);
  }, [ingredientsList, options._id])

  const handleClick = () => {
    setCount(count + 1);
    onIngredientClick(options);
    handleClickShowDetails(options);
  }


  return (
    <div className={`${styles.card} flex flex-column a-center p-3`} onClick={handleClick}>
      <Counter count={count} size="default" extraClass="m-1" />
      <div><img alt={options.name} src={options.image} /></div>
      <div className="flex a-center">
        <div className={`${styles.price} mr-2`}>{options.price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name}>{options.name}</p>

    </div>
  )
}

export default IngredientCard;



IngredientCard.propTypes = {
  options: ingredientPropTypes,
  onIngredientClick: PropTypes.func.isRequired,
  handleClickShowDetails: PropTypes.func.isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired
};