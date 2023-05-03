import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './home.module.scss';
import { loginRequest } from '../services/actions/auth';
import { useForm } from '../hooks/useForm';
import { useAppDispatch } from '../hooks/hooks';
import { FormEvent } from 'react';


export function LoginPage() {
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({ email: '', password: '' });

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(loginRequest(values));
    }


    return (
        <div className="flex flex-column a-center j-center h100pcnt">

            <form className="flex flex-column a-center" onSubmit={handleSubmit}>
                <h1 className={`${styles.heading} mb-6`}>Вход</h1>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
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