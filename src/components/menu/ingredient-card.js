import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/ingredient-type"
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsOrderContext } from '../../utils/app-context'
import styles from './ingredient-card.module.scss'

const IngredientCard = ({ options, handleClickShowDetails }) => {
  const { ingredientsOrder, setIngredientsOrder } = useContext(IngredientsOrderContext);
  const [count, setCount] = useState(0)

  useEffect(() => {
    let new_count = ingredientsOrder.ingredients.filter(el => el._id === options._id).length;
    setCount(new_count);
  }, [ingredientsOrder, options._id])

  const handleClick = () => {
    if (options.type === 'bun') return;

    let ingredientToAdd = { ...options, idForList: options._id + count }

    setIngredientsOrder({
      ...ingredientsOrder,
      ingredients: [...ingredientsOrder.ingredients, ingredientToAdd]
    });
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