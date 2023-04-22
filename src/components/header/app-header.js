import { Link, NavLink } from 'react-router-dom';
import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.scss'

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className="flex mr-10">

                <NavLink to={`/`} className={`${styles.navElement}`}>
                    {({ isActive }) => (
                        <div className={`flex a-center p-5`}>
                            <BurgerIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'} ml-2`}>Конструктор</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to={`/`} className={`${styles.navElement}`}>
                    {({ isActive }) => (
                        <div className={`flex a-center p-5`}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                        </div>
                    )}
                </NavLink>


            </div>
            <Link to={'/'}>
                <div className="flex a-center ml-20 mr-30"><Logo /></div>
            </Link>



            <NavLink to={`/profile`} className={`${styles.navElement}`}>
                {({ isActive }) => (
                    <div className={`flex a-center p-5 ml-30`}>
                        <ProfileIcon type={isActive ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'} ml-2`}>Личный кабинет</p>
                    </div>
                )}
            </NavLink>




        </header>
    )
}

export default AppHeader;