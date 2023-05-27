import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredientTypes } from "../../utils/ingredient-type"
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import {
    REMOVE_INGREDIENT,
} from '../../services/actions/order';

import {
    DECREMENT_INGREDIENT_COUNT
} from '../../services/actions/menu';
import { useAppDispatch } from '../../hooks/hooks';

interface ISliceCardProps {
    options: IIngredientTypes,
    index: number,
    moveCard: (i: number, j: number) => void
}
const SliceCard: FC<ISliceCardProps> = ({ options, index, moveCard }) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop]: any = useDrop<{ index: number, id: string }>({
        accept: 'slice',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()!
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'slice',
        item: () => {
            return { id: options._id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))



    const handleClose = (ingredient: IIngredientTypes) => {

        dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient });
        dispatch({ type: DECREMENT_INGREDIENT_COUNT, ingredient: ingredient });
    }


    return (
        <div id={options.idForConstructor} className="flex a-center" ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <div className="w100pcnt">
                <ConstructorElement
                    text={options.name}
                    price={options.price}
                    thumbnail={options.image}
                    handleClose={() => handleClose(options)}
                />
            </div>

        </div>
    )
}

export default SliceCard;


