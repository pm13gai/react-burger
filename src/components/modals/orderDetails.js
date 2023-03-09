import logo from "../../images/done.svg"

import styles from './orderDetails.module.scss'

const OrderDetails = () => {

    return (
        <div className={`${styles.details} flex flex-column a-center j-space-bt h100pcnt p-2`}>
            <p className={`${styles.num} text text_type_digits-large`}>123456</p>
            <p className="text text_type_main-medium">
                Идентификатор заказа
            </p>
            <div><img alt="CheckMarkLogo" src={logo} /></div>
            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>


        </div>
    )
}

export default OrderDetails;

