import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FeedCard from '../feed/feed-card'
import { connect as connectOrders, disconnect as disconnectOrders } from '../../services/actions/profile-orders';

import styles from '../feed/order-feed.module.scss'
import { useAppSelector } from '../../hooks/hooks';
import { getCookie } from '../../utils/utils';

const ProfileOrders = () => {

    const ordersData = useAppSelector(store => store.profileOrders.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = getCookie('token');
        dispatch(connectOrders(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
        return () => { dispatch(disconnectOrders()) }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className={`${styles.container} mt-10`}>
            {ordersData.map((el, i) => {
                return <FeedCard orderData={el} withStatus={true} key={el._id} />
            })}

        </div>
    )
}

export default ProfileOrders