import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './home.module.scss';
import { loginRequest } from '../services/actions/auth';


export function LoginPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: '', password: '' });
    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(data))
    }


    return (
        <div className="flex flex-column a-center j-center h100pcnt">

            <form className="flex flex-column a-center">
                <h1 className={`${styles.heading} mb-6`}>Вход</h1>
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
                    Войти
                </Button>

                <div className="flex a-center">
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link to={`/register`}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Зарегистрироваться
                        </Button>
                    </Link>

                </div>
                <div className="flex a-center">
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>

                    <Link to={`/forgot-password`}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="p-1">
                            Восстановить пароль
                        </Button>
                    </Link>

                </div>
            </form>
        </div>
    );
}