import { useEffect, useState } from 'react';
import AppHeader from './header/app-header'

import BurgerIngredients from './menu/burger-ingredients'
import BurgerConstructor from './order/burger-constructor'
import styles from './app.module.scss';

import { getIngredients } from '../utils/burger-api'
import { IngredientsOrderContext, IngredientsDataContext } from '../utils/app-context'


function App() {
  const [ingredientsData, setIngredientsData] = useState();
  const [err, setErr] = useState(null);
  const [ingredientsOrder, setIngredientsOrder] = useState({ bun: null, ingredients: [] });

  useEffect(() => {
    getIngredients().then(data => { 
      setIngredientsData(data.data);
      setIngredientsOrder({
        bun: data.data.find(el => el.name === 'Краторная булка N-200i'),
        ingredients: []
      })
    }).catch(error => { setErr(error) })
  }, [])


  return (
    <div className="flex flex-column h100pcnt overflow-h">
      <IngredientsDataContext.Provider value={{ ingredientsData, setIngredientsData }}>
      <IngredientsOrderContext.Provider value={{ ingredientsOrder, setIngredientsOrder }}>
        <AppHeader />
        <div className="flex j-center h100pcnt overflow-h">
          <div className="flex flex-column h100pcnt overflow-h mr-10">
            <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1>
            {ingredientsData && <BurgerIngredients ingredients={ingredientsData} />}
            {err && <div>Нет данных</div>}
          </div>
          <div className="h100pcnt">
            {ingredientsData && <BurgerConstructor />}
          </div>

        </div>
      </IngredientsOrderContext.Provider>
      </IngredientsDataContext.Provider>
    </div>
  );
}

export default App;
