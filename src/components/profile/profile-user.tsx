import { FormEvent, useEffect, useState } from 'react';

import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    patchUser
} from '../../services/actions/auth';
import styles from '../../pages/profile.module.scss';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';



export function ProfileUser() {
    const dispatch = useAppDispatch();
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


    return (
        <div className={`${styles.content} pt-30`}>
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
    );
}