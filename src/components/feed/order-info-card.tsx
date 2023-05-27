import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getOrderInfo } from '../../services/actions/order-info';
import styles from './order-info-card.module.scss'


const OrderInfoCard = () => {
    const ingredientsData = useAppSelector(store => store.menu.ingredients);
    const { orders } = useAppSelector(store => store.feed);
    const { order } = useAppSelector(store => store.orderInfo);
    const dispatch = useAppDispatch();

    const { id } = useParams();

    let orderData = orders.find(el => el.number.toString() === id);

    useEffect(() => {
        if (id) {
            dispatch(getOrderInfo(id));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!orderData) orderData = order;

    if (!orderData) return <></>;

    const price = orderData.ingredients.reduce((price: number, id: string) => {
        let options = ingredientsData.find(el => el._id === id)!;
        return options ? price + options.price : price;
    }, 0);


    const ingredientsArr: { id: string; count: number; }[] = [];
    orderData.ingredients.forEach((id: string) => {
        const index = ingredientsArr.findIndex(val => val.id === id)
        if (index !== -1) {
            ingredientsArr[index].count++;
        } else {
            ingredientsArr.push({
                id: id,
                count: 1
            })
        }
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

    let composition: any = [];
    ingredientsArr.forEach((arrEl) => {
        let options = ingredientsData.find(el => el._id === arrEl.id)!;
        if (!options) return;
        composition.push(<div key={options._id} className='flex j-space-bt mb-4'>
            <div className='flex a-center'>
                <div className={styles.ingredient}>
                    <img alt={options.name} src={options.image} />
                </div>
                <div className='ml-4'>{options.name}</div>
            </div>


            <div className="flex a-center ml-8">
                <div className={`${styles.price} mr-2 text text_type_digits-default`}>{arrEl.count}&nbsp;x&nbsp;{options.price}</div>
                <CurrencyIcon type="primary" />
            </div>

        </div>);
    })

    return (<div className={`flex flex-column h100pcnt a-center`}>

        <div className={`${styles.card} flex flex-column h100pcnt j-center`}>
            <div className="flex j-center mb-10">
                <div className={`${styles.number} text text_type_digits-default`}>#{orderData.number}</div>
            </div>
            <div className={`${styles.title}`}>{orderData.name}</div>
            <div className={`${styles.status} mb-15 ${status === 'Выполнен' && styles.statusDone}`}>{status}</div>




            <div className={`flex flex-column mb-10`}>
                <div className={`${styles.title} mb-6`}>Состав:</div>
                <div className={`${styles.ingredientsContainer} flex flex-column`}>
                    {/* {ingredientsArr.map((arrEl) => {
                        let options = ingredientsData.find(el => el._id === arrEl.id)!;
                        if (!options) return;
                        return <div key={options._id} className='flex j-space-bt mb-4'>
                            <div className='flex a-center'>
                                <div className={styles.ingredient}>
                                    <img alt={options.name} src={options.image} />
                                </div>
                                <div className='ml-4'>{options.name}</div>
                            </div>


                            <div className="flex a-center ml-8">
                                <div className={`${styles.price} mr-2 text text_type_digits-default`}>{arrEl.count}&nbsp;x&nbsp;{options.price}</div>
                                <CurrencyIcon type="primary" />
                            </div>

                        </div>
                    })} */}
                    {composition}
                </div>


            </div>





            <div className="flex j-space-bt a-center">
                <div className={`${styles.date} text_color_inactive`}><FormattedDate date={new Date(orderData.createdAt)} /></div>

                <div className="flex a-center">
                    <div className={`${styles.price} mr-2 text text_type_digits-default`}>{price}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>


        </div>

    </div>

    )
}

export default OrderInfoCard