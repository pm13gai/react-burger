import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './home.module.scss';

import { changeRasswordRequest } from '../services/actions/reset';
import { useForm } from '../hooks/useForm';


export function ResetPasswordPage() {
    const dispatch = useDispatch();
    const resetEmailSent = useSelector(store => store.reset.resetEmailSent);
    const {values, handleChange } = useForm({ password: '', token: '' });


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changeRasswordRequest(values));
    }

    if (!resetEmailSent) {
        return (
            <Navigate
                to={'/forgot-password'}
            />
        );
    }

    return (
        <div className="flex flex-column a-center j-center h100pcnt">

            <form className="flex flex-column a-center" onSubmit={handleSubmit}>
                <h1 className={`${styles.heading} mb-6`}>Восстановление пароля</h1>

                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder="Введите новый пароль"
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Сохранить
                </Button>

                <div className="flex a-center">
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
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