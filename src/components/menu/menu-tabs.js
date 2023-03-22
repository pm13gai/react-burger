import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'



const MenuTabs = ({ setScroll, currentTab, setCurrentTab }) => {

  const handleClick = (tab) => {
    setCurrentTab(tab);
    setScroll(tab);
  }


  return (
    <div className="flex">
      <Tab value="one" active={currentTab === 'one'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === 'two'} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="three" active={currentTab === 'three'} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  )
}

export default MenuTabs;

MenuTabs.propTypes = {
  setScroll: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired
};