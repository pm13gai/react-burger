import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    patchUser,
    logoutRequest
} from '../services/actions/auth';
import styles from './profile.module.scss';



export function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);
    const [data, setData] = useState({ email: user.email, password: '', name: user.name });
    const [isChange, setIsChange] = useState(false);
    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    }
    useEffect(() => {
        if (user.email !== data.email || user.name !== data.name || data.password !== '') setIsChange(true);
        else setIsChange(false);
    }, [data, user])

    const handleSubmit = () => {
        dispatch(patchUser(data));
    }

    const handleCancel = () => {
        setData({ email: user.email, password: '', name: user.name });
    }
    const handleLogout = () => {
        dispatch(logoutRequest());
        navigate('/login');
    }

    const { pathname } = useLocation();
    const isProfile = pathname === '/profile' ? true : false;

    return (
        <div className={`${styles.profileContainer} flex j-center h100pcnt pt-30`}>
            <div className={`${styles.navBlock} flex flex-column`}>
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
                <form className={`${styles.editForm} flex flex-column a-center`}>

                    <Input
                        onChange={onChange}
                        icon='EditIcon'
                        value={data.name}
                        name={'name'}
                        placeholder="Имя"
                        extraClass="mb-6"
                    />
                    <EmailInput
                        onChange={onChange}
                        value={data.email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={data.password}
                        name={'password'}
                        icon="EditIcon"
                        extraClass="mb-6"
                    />

                    {isChange &&
                        <div className='flex'>
                            <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                            <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleCancel}>
                                Отмена
                            </Button>
                        </div>
                    }
                </form>
            </div>


        </div>
    );
}