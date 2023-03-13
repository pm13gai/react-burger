import { useEffect, useState } from 'react';
import AppHeader from './header/appHeader'

import BurgerIngredients from './menu/burgerIngredients'
import BurgerConstructor from './order/burgerConstructor'
import styles from './App.module.scss';

import { getIngredients } from '../utils/burgerApi'
import { IngredientsListContext } from '../utils/appContext'


function App() {
  const [data, setData] = useState();
  const [err, setErr] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    getIngredients().then(data => { setData(data.data) }).catch(error => { setErr(error) })
  }, [])


  return (
    <div className="flex flex-column h100pcnt overflow-h">
      <IngredientsListContext.Provider value={{ ingredientsList, setIngredientsList }}>
        <AppHeader />
        <div className="flex j-center h100pcnt overflow-h">
          <div className="flex flex-column h100pcnt overflow-h mr-10">
            <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1>
            {data && <BurgerIngredients ingredients={data} />}
            {err && <div>Нет данных</div>}
          </div>
          <div className="h100pcnt">
            {data && <BurgerConstructor bunDetails={data.find(el => el.name === 'Краторная булка N-200i')} />}
          </div>

        </div>
      </IngredientsListContext.Provider>
    </div>
  );
}

export default App;
