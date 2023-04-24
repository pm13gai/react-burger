import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    patchUser,
    logoutRequest
} from '../services/actions/auth';
import styles from './profile.module.scss';
import { useForm } from '../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';



export function ProfilePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(store => store.auth.user);
    const { values, handleChange, setValues } = useForm({ email: user.email, password: '', name: user.name });
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        if (user.email !== values.email || user.name !== values.name || values.password !== '') setIsChange(true);
        else setIsChange(false);
    }, [values, user])

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(patchUser(values));
    }

    const handleCancel = () => {
        setValues({ email: user.email, password: '', name: user.name });
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
                <form className={`${styles.editForm} flex flex-column a-center`} onSubmit={handleSubmit}>

                    <Input
                        onChange={handleChange}
                        icon='EditIcon'
                        value={values.name}
                        name={'name'}
                        placeholder="Имя"
                        extraClass="mb-6"
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        icon="EditIcon"
                        extraClass="mb-6"
                    />

                    {isChange &&
                        <div className='flex'>
                            <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
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