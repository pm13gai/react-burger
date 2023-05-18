import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    logoutRequest
} from '../services/actions/auth';
import styles from './profile.module.scss';
import { useAppDispatch } from '../hooks/hooks';



export function ProfilePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutRequest());
        navigate('/login');
    }

    const { pathname } = useLocation();
    const isProfile = pathname === '/profile' ? true : false;

    return (
        <div className={`${styles.profileContainer} flex j-center h100pcnt`}>
            <div className={`${styles.navBlock} flex flex-column pt-30`}>
                <NavLink to={`/profile`} className={`${styles.link} mb-8`}>
                    {({ isActive }) => (

                        <p className={`text text_type_main-default ${isActive && isProfile ? '' : 'text_color_inactive'}`}>Профиль</p>
                    )}
                </NavLink>
                <NavLink to={`/profile/orders`} className={`${styles.link} mb-8`}>
                    {({ isActive }) => (
                        <p className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}> История заказов</p>
                    )}
                </NavLink>

                <Button htmlType="button" type="secondary" size="large" onClick={handleLogout} extraClass={`${styles.logout} mb-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Выход
                    </p>
                </Button>



                <p className={`${styles.descLabel} text text_type_main-small text_color_inactive`}>
                    В этом разделе вы можете измениь свои персональные данные
                </p>
            </div>
            <div className={`${styles.content}`}>
                <Outlet />
            </div>


        </div>
    );
}