import FeedCard from './feed-card'

import styles from './order-feed.module.scss'
import { useAppSelector } from '../../hooks/hooks';

const OrderFeed = () => {
    const ordersData = useAppSelector(store => store.feed.orders);

    return (
        <div className={styles.container}>
            {ordersData.map((el, i) => {
                return <FeedCard orderData={el} key={el._id} />
            })}

        </div>
    )
}

export default OrderFeed