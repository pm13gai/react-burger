import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './home.module.scss';
import { emailRequest } from '../services/actions/reset';
import { useForm } from '../hooks/useForm';



export function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const resetEmailSent = useSelector(store => store.reset.resetEmailSent);
    const {values, handleChange } = useForm({ email: '' });


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(emailRequest(values));
    }

    if (resetEmailSent) {
        return (
            <Navigate
                to={'/reset-password'}
            />
        );
    }

    return (
        <div className="flex flex-column a-center j-center h100pcnt">

            <form className="flex flex-column a-center" onSubmit={handleSubmit}>
                <h1 className={`${styles.heading} mb-6`}>Восстановление пароля</h1>

                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    placeholder="Укажите E-mail"
                    isIcon={false}
                    extraClass="mb-6"
                />

                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20" disabled={false}>
                    Восстановить
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