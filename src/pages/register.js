import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    registerRequest
} from '../services/actions/auth';
import styles from './home.module.scss';



export function RegisterPage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);
    const [data, setData] = useState({ email: '', password: '', name: '' });
    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }



    const handleSubmit = () => {
        dispatch(registerRequest(data))
    }

    if (user) {
        return (
            <Navigate
                to={'/'}
            />
        );
    }

    return (
        <div className="flex flex-column a-center j-center h100pcnt">

            <form className="flex flex-column a-center">
                <h1 className={`${styles.heading} mb-6`}>Регистрация</h1>
                <Input
                    onChange={onChange}
                    value={data.name}
                    name={'name'}
                    placeholder="Имя"
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onChange}
                    value={data.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={data.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" onClick={handleSubmit} disabled={false}>
                    Зарегистрироваться
                </Button>

                <div className="flex a-center">
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Link to={`/login`}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Войти
                        </Button>
                    </Link>

                </div>
            </form>
        </div>
    );
}