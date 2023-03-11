import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './appHeader.module.scss'

const AppHeader = () => {
    return (
        <div className={styles.header}>
            <div className="flex">
                <a href="/" className={`${styles.navElement} flex a-center p-5`}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </a>

                <a href="/" className={`${styles.navElement} flex a-center p-5`}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                </a>

            </div>
            <div className="flex a-center mr-25"><Logo /></div>

            <a href="/" className={`${styles.navElement} flex a-center p-5`}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </a>

        </div>
    )
}

export default AppHeader;