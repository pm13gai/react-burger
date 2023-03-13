import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/ingredientType"
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsListContext } from '../../utils/appContext'
import styles from './ingredientCard.module.scss'

const IngredientCard = ({ options, handleClickShowDetails }) => {
  const { ingredientsList, setIngredientsList } = useContext(IngredientsListContext);
  const [count, setCount] = useState(0)

  useEffect(() => {
    let new_count = ingredientsList.filter(el => el._id === options._id).length;
    setCount(new_count);
  }, [ingredientsList, options._id])

  const handleClick = () => {
    if (options.type === 'bun') return;

    let ingredientToAdd = { ...options, idForList: options._id + count }

    setIngredientsList([...ingredientsList, ingredientToAdd]);
    setCount(count + 1);
    handleClickShowDetails(options);

  }


  return (
    <div className={`${styles.card} flex flex-column a-center p-3`} onClick={handleClick}>
      <Counter count={options.name === 'Краторная булка N-200i' ? 2 : count} size="default" extraClass="m-1" />
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
  handleClickShowDetails: PropTypes.func.isRequired
};