import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


import BurgerIngredients from '../components/menu/burger-ingredients'
import BurgerConstructor from '../components/order/burger-constructor'
import styles from './home.module.scss';

import { getIngredients } from '../services/actions/menu';


export function HomePage() {

    const dispatch = useDispatch();
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.menu);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);


    return (
        <main className="flex j-center h100pcnt overflow-h">
            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-column h100pcnt overflow-h mr-10">
                    <h1 className={`${styles.title} mt-10 mb-5`}>Соберите бургер</h1>
                    {!ingredientsRequest && !ingredientsFailed && <BurgerIngredients />}
                    {ingredientsFailed && <div>Нет данных</div>}
                </div>
                <div className="h100pcnt pt-25">
                    <BurgerConstructor />
                </div>

            </DndProvider>
        </main>


    );
}

