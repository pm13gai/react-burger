import { useAppSelector } from '../../hooks/hooks';
import styles from './order-report.module.scss'

const OrderReport = () => {
    const { orders, total, totalToday } = useAppSelector(store => store.feed);

    const doneOrders = orders.filter(el => el.status === "done").map(el => el.number);
    const pendingOrders = orders.filter(el => el.status === "pending").map(el => el.number);

    return (
        <div className={styles.container}>
            <div className='flex mb-15'>
                <div className={`flex-1`}>
                    <div className={`${styles.title} mb-6`}>Готовы:</div>
                    <div className={`${styles.columnContainer} flex flex-column wrap-1`}>
                        {doneOrders.map((el, i) => <div className={`${styles.doneOrder}`} key={i}>{el}</div>)}
                    </div>

                </div>
                <div className={`flex-1`}>
                    <div className={`${styles.title} mb-6`}>В работе:</div>
                    <div className={`${styles.columnContainer} flex flex-column wrap-1`}>
                        {pendingOrders.map((el, i) => <div className={`${styles.doneOrder}`} key={i}>{el}</div>)}
                    </div>

                </div>
            </div>
            <div className={`${styles.title}`}>Выполнено за все время:</div>
            <div className={`${styles.total} text text_type_digits-large mb-15`}>{total}</div>
            <div className={`${styles.title}`}>Выполнено за сегодня:</div>
            <div className={`${styles.total} text text_type_digits-large`}>{totalToday}</div>
        </div>
    )
}

export default OrderReport