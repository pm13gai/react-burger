import { useState, useRef } from 'react';
import MenuTabs from './menu-tabs'
import IngredientCard from './ingredient-card'


import styles from './burger-ingredients.module.scss'
import { useAppSelector } from '../../hooks/hooks';

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
    if (node == null) {
        return null;
    }

    if (node.scrollHeight > node.clientHeight) {
        return node;
    } else {
        return getScrollParent(node.parentElement);
    }
}

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState('one')
    const ingredientsData = useAppSelector(store => store.menu.ingredients);

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);



    const handleScroll = (e: React.SyntheticEvent) => {
        let scrollTop = e.currentTarget.scrollTop;
        let tab = 'one';
        if (bunRef.current && scrollTop > bunRef.current.offsetTop - 30) tab = 'one';
        if (sauceRef.current && scrollTop > sauceRef.current.offsetTop - 30) tab = 'two';
        if (mainRef.current && scrollTop > mainRef.current.offsetTop - 30) tab = 'three';
        setCurrentTab(tab);

    }




    const setScroll = (tab: string) => {
        try {

            let ref: any;
            switch (tab) {
                case 'one':
                    ref = bunRef;
                    break;
                case 'two':
                    ref = sauceRef;
                    break;
                case 'three':
                    ref = mainRef;
                    break;

                default:
                    break;
            }
            let top = ref.current.offsetTop;
            if (ref) {
                let element = getScrollParent(ref.current);
                if (element) {
                    element.scroll({

                        top: top,
                        behavior: "smooth",
                    });
                }

            }


        } catch (err) {
            console.log(err);
        }


    }


    return (
        <div className="flex flex-column a-center h100pcnt overflow-h">
            <MenuTabs setScroll={setScroll} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <div id="containerIngredients" className={`${styles.containerIngredients} pt-10 pb-10`} onScroll={handleScroll}>
                <h2 ref={bunRef}>Булки</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter((el: any) => el.type === "bun").map((el: any) => <IngredientCard key={el._id} options={el} />)}</div>
                <h2 ref={sauceRef}>Соусы</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter((el: any) => el.type === "sauce").map((el: any) => <IngredientCard key={el._id} options={el} />)}</div>
                <h2 ref={mainRef}>Начинки</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter((el: any) => el.type === "main").map((el: any) => <IngredientCard key={el._id} options={el} />)}</div>

            </div>

        </div>
    )
}

export default BurgerIngredients;


