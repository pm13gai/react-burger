import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks';
import { IIngredientTypes } from '../../utils/ingredient-type';
import styles from './ingredient-details.module.scss'

const IngredientDetails = () => {
    const ingredient = useAppSelector(store => store.ingredientDetails.ingredient);
    const ingredients: Array<IIngredientTypes> = useAppSelector(store => store.menu.ingredients);

    const { id } = useParams();
    const options = ingredient ? ingredient : ingredients.find(el => el._id === id);


    if (!options) {
        return null;
    }

    return (
        <div className={`${styles.details} flex flex-column a-center h100pcnt j-center`}>
            <div><img alt={options.name} src={options.image_large} /></div>
            <p className={`text text_type_main-medium mb-8`}>{options.name}</p>
            <div className="flex a-center text_color_inactive mb-5">
                <div className="flex flex-column a-center mr-5">
                    <p className="mb-2">Калории, ккал</p>
                    <div className="text text_type_digits-default">{options.calories}</div>
                </div>
                <div className="flex flex-column a-center mr-5">
                    <p className="mb-2">Белки, г</p>
                    <div className="text text_type_digits-default">{options.proteins}</div>
                </div>
                <div className="flex flex-column a-center mr-5">
                    <p className="mb-2">Жиры, г</p>
                    <div className="text text_type_digits-default">{options.fat}</div>
                </div>
                <div className="flex flex-column a-center">
                    <p className="mb-2">Углеводы, г</p>
                    <div className="text text_type_digits-default">{options.carbohydrates}</div>
                </div>
            </div>


        </div>
    )
}

export default IngredientDetails;

