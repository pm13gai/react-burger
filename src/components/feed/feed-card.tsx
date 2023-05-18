import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { IOrderData } from '../../services/types/feed';
import styles from './feed-card.module.scss'

interface IFeedCardProps {
    orderData: IOrderData,
    withStatus?: boolean
}

const FeedCard: FC<IFeedCardProps> = ({ orderData, withStatus }) => {
    const ingredientsData = useAppSelector(store => store.menu.ingredients);


    const price = orderData.ingredients.reduce((price, id) => {
        let options = ingredientsData.find(el => el._id === id)!;
        return options ? price + options.price : price;
    }, 0);

    const location = useLocation();

    let composition: any = [];
    orderData.ingredients.slice(0, 6).forEach((id, i) => {
        let options = ingredientsData.find(el => el._id === id)!;
        if (!options) return;
        let count = orderData.ingredients.length;
        composition.push(<div className={styles.ingredient} key={i}>
            <img alt={options.name} src={options.image} className={`${count > 6 && i === 0 && styles.withLabel}`} />
            {count > 6 && i === 0 && <div className={styles.label}>+{count - 6}</div>}
        </div>)
    });
    let status = '';
    switch (orderData.status) {
        case "done":
            status = 'Выполнен';
            break;
        case "pending":
            status = 'В работе';
            break;
        case "created":
            status = 'Создан';
            break;

        default:
            break;
    }
    return (
        <Link
            key={orderData._id}
            to={`${location.pathname}/${orderData.number}`}
            state={{ background: location }}
            className={styles.link}
        >
            <div className={styles.card}>
                <div className="flex j-space-bt mb-6">
                    <div className={`${styles.number} text text_type_digits-default`}>#{orderData.number}</div>
                    <div className={`${styles.date} text_color_inactive`}><FormattedDate date={new Date(orderData.createdAt)} /></div>
                </div>
                <div className={styles.title}>{orderData.name}</div>
                {withStatus && <div className={`${styles.status} mb-5 ${status === 'Выполнен' && styles.statusDone}`}>{status}</div>}
                

                <div className="flex j-space-bt">


                    <div className={`${styles.imgContainer} flex`}>

                        {composition}

                    </div>

                    <div className="flex a-center">
                        <div className={`${styles.price} mr-2`}>{price}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>


            </div>
        </Link>
    )
}

export default FeedCard