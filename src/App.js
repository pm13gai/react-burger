import { useEffect, useState } from 'react';
import AppHeader from './components/header/appHeader'

import BurgerIngredients from './components/menu/burgerIngredients'
import BurgerConstructor from './components/order/burgerConstructor'
import './App.css';

const URL_FOR_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";


function App() {
  const [data, setData] = useState();
  const [err, setErr] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    fetch(URL_FOR_INGREDIENTS, {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErr(error);
      });

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
          <h1 className="mt-10 mb-5">Соберите бургер</h1>
          {data && <BurgerIngredients ingredients={data} onIngredientClick={onIngredientClick} ingredientsList={ingredientsList} />}
          {err && <div>Нет данных</div>}
        </div>
        <div className="h100pcnt">
          <BurgerConstructor ingredientsList={ingredientsList} onChangeIngredientsList={onChangeIngredientsList} />
        </div>

      </div>
    </div>
  );
}

export default App;
