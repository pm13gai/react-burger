import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/ingredientType"
import MenuTabs from './menuTabs'
import IngredientCard from './ingredientCard'
import Modal from '../modals/modal';
import IngredientDetails from '../modals/ingredientDetails';
import styles from './burgerIngredients.module.scss'

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

const BurgerIngredients = ({ ingredients, onIngredientClick, ingredientsList }) => {
    const [ingredientForModal, setIngredientForModal] = useState(null);

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleClickShowDetails = (ingredient) => {
        setIngredientForModal(ingredient);
    }

    const handleCloseModal = () => {
        setIngredientForModal(null);
    }


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
            <MenuTabs setScroll={setScroll} />

            <div className={`${styles.containerIngredients} pt-10 pb-10`}>
                <h2 ref={bunRef}>Булки</h2>
                <div className='flex j-center wrap-1'>{ingredients.filter(el => el.type === "bun").map(el => <IngredientCard key={el._id} options={el} onIngredientClick={onIngredientClick} ingredientsList={ingredientsList} handleClickShowDetails={handleClickShowDetails} />)}</div>
                <h2 ref={sauceRef}>Соусы</h2>
                <div className='flex j-center wrap-1'>{ingredients.filter(el => el.type === "sauce").map(el => <IngredientCard key={el._id} options={el} onIngredientClick={onIngredientClick} ingredientsList={ingredientsList} handleClickShowDetails={handleClickShowDetails} />)}</div>
                <h2 ref={mainRef}>Начинки</h2>
                <div className='flex j-center wrap-1'>{ingredients.filter(el => el.type === "main").map(el => <IngredientCard key={el._id} options={el} onIngredientClick={onIngredientClick} ingredientsList={ingredientsList} handleClickShowDetails={handleClickShowDetails} />)}</div>

            </div>

            {ingredientForModal && (<Modal header='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails options={ingredientForModal} />
            </Modal>)}
        </div>
    )
}

export default BurgerIngredients;



BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onIngredientClick: PropTypes.func.isRequired,
    ingredientsList: PropTypes.arrayOf(ingredientPropTypes).isRequired
};