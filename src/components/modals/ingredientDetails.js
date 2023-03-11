import { ingredientPropTypes } from "../../utils/ingredientType"
import styles from './ingredientDetails.module.scss'

const IngredientDetails = ({ options }) => {


    return (
        <div className={`${styles.details} flex flex-column a-center`}>
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



IngredientDetails.propTypes = {
    options: ingredientPropTypes,
};