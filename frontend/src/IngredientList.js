import { useState } from "react";

const IngredientList = (props) => {
    const [items, setItem] = useState({ item: props.item });

    function deleteEventHandler(e) {
        handleButtonClick(e)
        props.delete(items.item);
        props.update(items.item);
    }

    function editEventHandler(e) {
        handleButtonClick(e)
        props.edit("재료수정", items.item);
    }

    function handleIngredientClick(e) {
        var ingredient = e.target.textContent;
        var bool = window.confirm(`${ingredient}(으)로 레시피 검색을 하시겠습니까`);
        if (bool) {
            localStorage.setItem("ingredient",ingredient);
            window.location.href = ('/');
        }
        console.log(`Clicked on ingredient: ${items.item.ingredient}`);
    }

    function handleButtonClick(e) {
        e.stopPropagation(); // 부모 요소로 이벤트 전파 방지
    }

    return (
        <tr class="table-secondary">
            <th scope="row" style={{ paddingTop: 15 }}>
                <div onClick={handleIngredientClick} style={{ cursor: "pointer" }}>{items.item.ingredient}</div>
            </th>
            <td style={{ paddingTop: 15 }}>{items.item.ingrcount}</td>
            <td style={{ paddingTop: 15 }}>{items.item.usebydate}</td>
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
