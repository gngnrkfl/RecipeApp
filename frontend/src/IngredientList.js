import { useState } from "react";

const IngredientList = (props) => {
    const [items, setItem] = useState({ item: props.item });

    function deleteEventHandler() {
        props.delete(items.item);
        props.update(items.item);
    }

    function editEventHandler() {
        props.edit("재료수정")
    }

    return (
        <tr class="table-secondary">
            <th scope="row" style={{ paddingTop:15 }}>{items.item.ingredient}</th>
            <td style={{ paddingTop:15 }}>{items.item.ingrcount}</td>
            <td style={{ paddingTop:15 }}>{items.item.usebydate}</td>
            <td>
                <button type="button" class="btn btn-danger" onClick={editEventHandler}>수정</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" onClick={deleteEventHandler}>삭제</button>
            </td>
        </tr>
    );
}

export default IngredientList;