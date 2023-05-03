import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';

interface IMenuTabsProps {
  setScroll: (tab: string) => void,
  currentTab: string,
  setCurrentTab: (tab: string) => void
}

const MenuTabs: FC<IMenuTabsProps> = ({ setScroll, currentTab, setCurrentTab }) => {

  const handleClick = (tab: string) => {
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
