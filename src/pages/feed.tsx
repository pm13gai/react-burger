
import styles from './home.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import OrderFeed from '../components/feed/order-feed';
import OrderReport from '../components/feed/order-report';
import { useEffect } from 'react';
import { connect as connectFeed, disconnect as disconnectFeed } from '../services/actions/feed';



export function FeedPage() {
    const { ingredientsRequest, ingredientsFailed } = useAppSelector(store => store.menu);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(connectFeed('wss://norma.nomoreparties.space/orders/all'));
        return () => { dispatch(disconnectFeed()) }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="flex j-center h100pcnt overflow-h">

            <div className="flex flex-column h100pcnt overflow-h mr-10">
                <h1 className={`${styles.title} mt-10 mb-5`}>Лента заказов</h1>
                {!ingredientsRequest && !ingredientsFailed && <OrderFeed />}
                {ingredientsFailed && <div>Нет данных</div>}
            </div>
            <div className="h100pcnt pt-25">
                <OrderReport />
            </div>

        </div>


    );
}

