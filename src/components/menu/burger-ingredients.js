import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MenuTabs from './menu-tabs'
import IngredientCard from './ingredient-card'


import styles from './burger-ingredients.module.scss'

function getScrollParent(node) {
    if (node == null) {
        return null;
    }

    if (node.scrollHeight > node.clientHeight) {
        return node;
    } else {
        return getScrollParent(node.parentNode);
    }
}

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState('one')
    const ingredientsData = useSelector(store => store.menu.ingredients);

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);


    useEffect(() => {
        const handleScroll = (e) => {
            let scrollTop = e.srcElement.scrollTop;
            let tab = 'one';
            if (scrollTop > bunRef.current.offsetTop - 30) tab = 'one';
            if (scrollTop > sauceRef.current.offsetTop - 30) tab = 'two';
            if (scrollTop > mainRef.current.offsetTop - 30) tab = 'three';
            setCurrentTab(tab);

        }
        const containerIngredients = document.getElementById('containerIngredients')

        containerIngredients.addEventListener('scroll', handleScroll);
        return () => containerIngredients.removeEventListener('scroll', handleScroll);
    }, []);






    const setScroll = (tab) => {
        try {

            let ref;
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

            getScrollParent(ref.current).scroll({

                top: top,
                behavior: "smooth",
            });

        } catch (err) {
            console.log(err);
        }


    }


    return (
        <div className="flex flex-column a-center h100pcnt overflow-h">
            <MenuTabs setScroll={setScroll} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <div id="containerIngredients" className={`${styles.containerIngredients} pt-10 pb-10`}>
                <h2 ref={bunRef}>Булки</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter(el => el.type === "bun").map(el => <IngredientCard key={el._id} options={el} />)}</div>
                <h2 ref={sauceRef}>Соусы</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter(el => el.type === "sauce").map(el => <IngredientCard key={el._id} options={el} />)}</div>
                <h2 ref={mainRef}>Начинки</h2>
                <div className='flex j-center wrap-1'>{ingredientsData.filter(el => el.type === "main").map(el => <IngredientCard key={el._id} options={el} />)}</div>

            </div>

        </div>
    )
}

export default BurgerIngredients;


