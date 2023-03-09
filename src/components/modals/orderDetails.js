import logo from "../../images/done.svg"

import styles from './orderDetails.module.scss'

const OrderDetails = () => {

    return (
        <div className={`${styles.details} flex flex-column a-center j-space-bt h100pcnt`}>
            <p className={`${styles.num} text text_type_digits-large mb-8`}>123456</p>
            <p className="text text_type_main-medium mb-15">
                Идентификатор заказа
            </p>
            <div className="mb-15"><img alt="CheckMarkLogo" src={logo} /></div>
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-10">
                Дождитесь готовности на орбитальной станции
            </p>


        </div>
    )
}

export default OrderDetails;

