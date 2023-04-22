import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    registerRequest
} from '../services/actions/auth';
import styles from './home.module.scss';
import { useForm } from '../hooks/useForm';



export function RegisterPage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);
    const {values, handleChange } = useForm({ email: '', password: '', name: '' });



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerRequest(values));
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

            <form className="flex flex-column a-center" onSubmit={handleSubmit}>
                <h1 className={`${styles.heading} mb-6`}>Регистрация</h1>
                <Input
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    placeholder="Имя"
                    extraClass="mb-6"
                />
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