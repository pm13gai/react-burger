import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


//import styles from './navElement.module.scss'

const MenuTabs = ({ setScroll }) => {
  const [current, setCurrent] = useState('one')
  useEffect(() => {
    setScroll(current)
  }, [current, setScroll]);

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default MenuTabs;

MenuTabs.propTypes = {
  setScroll: PropTypes.func.isRequired
};