import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from './header/app-header'

import BurgerIngredients from './menu/burger-ingredients'
import BurgerConstructor from './order/burger-constructor'
import styles from './app.module.scss';

import { getIngredients } from '../services/actions/menu';


function App() {


    const dispatch = useDispatch();
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.menu);
    const bun = useSelector(store => store.order.bun);


    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);


    return (
        <div className="flex flex-column h100pcnt overflow-h">

            <AppHeader />
            {/* <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1> */}
            <div className="flex j-center h100pcnt overflow-h">
                <DndProvider backend={HTML5Backend}>
                    <div className="flex flex-column h100pcnt overflow-h mr-10">
                        <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1>
                        {!ingredientsRequest && !ingredientsFailed && <BurgerIngredients />}
                        {ingredientsFailed && <div>Нет данных</div>}
                    </div>
                    <div className="h100pcnt pt-25">
                        {bun && <BurgerConstructor />}
                    </div>

                </DndProvider>
            </div>

        </div>
    );
}

export default App;
