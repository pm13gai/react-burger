import { useEffect, useState } from 'react';
import AppHeader from './header/appHeader'

import BurgerIngredients from './menu/burgerIngredients'
import BurgerConstructor from './order/burgerConstructor'
import styles from './App.module.scss';

import { getIngredients } from '../utils/burgerApi'


function App() {
  const [data, setData] = useState();
  const [err, setErr] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {

    getIngredients().then(data => {setData(data.data)}).catch(error => {setErr(error)})

  }, [])


  const onIngredientClick = (ingredient) => {
    let count = ingredientsList.reduce((count, el) => {
      if (el._id === ingredient._id) return count + 1;
      return count
    }, 0);

    let ingredientToAdd= { ...ingredient, idForList: ingredient._id + count }

    setIngredientsList([...ingredientsList, ingredientToAdd]);

  }
  const onChangeIngredientsList = (id) => {
    setIngredientsList(ingredientsList.slice(0).filter((el) => el.idForList !== id))
  }
  return (
    <div className="flex flex-column h100pcnt overflow-h">
      <AppHeader />
      <div className="flex j-center h100pcnt overflow-h">
        <div className="flex flex-column h100pcnt overflow-h mr-10">
          <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1>
          {data && <BurgerIngredients ingredients={data} onIngredientClick={onIngredientClick} ingredientsList={ingredientsList} />}
          {err && <div>Нет данных</div>}
        </div>
        <div className="h100pcnt">
        {data && <BurgerConstructor ingredientsList={ingredientsList} onChangeIngredientsList={onChangeIngredientsList} bunDetails={data.find(el => el.name === 'Краторная булка N-200i')} />}
        </div>

      </div>
    </div>
  );
}

export default App;
