import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { call } from "./service/ApiService";
import IngredientList from "./IngredientList";
import './bootstrap.css';

const Ingredient = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [editItem, setEditItems] = useState([]);
    const [edit, setEdit] = useState("재료추가");

    function deleteList(item) {
        console.log(item);
        call("/ingredient", "DELETE", item).then((response) =>
            setItems(response.data)
        );
    }

    function update(item) {
        console.log(item);
        call("/ingredient", "PUT", item).then((response) =>
            setItems(response.data)
        );
    }

    function edit_f(edit_trigger, item) {
        setEdit(edit_trigger);
        setEditItems(item);
        let date = new Date(item.usebydate);
        setStartDate(date);
        let ingr = document.querySelector("#Inputname");
        ingr.value = item.ingredient;
        let ingrcount = document.querySelector("#InputCount");
        ingrcount.value = item.ingrcount;
    }

    function cancel() {
        window.location.href = "/ingredient"
    }

    const handleSubmit = e => {
        // e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get("name");
        const count = data.get("count");
        const date_split = data.get("date").split("/");
        const date = `${date_split[2]}-${date_split[0]}-${date_split[1]}`
        const ingredient = ({ ingredient: name, ingrcount: count, usebydate: date });
        if (edit === "재료추가")
            call("/ingredient", "POST", ingredient);
        else if (edit === "재료수정"){
            editItem.ingredient = name;
            editItem.ingrcount = count;
            editItem.usebydate = date;
            update(editItem);
        }
    }

    useEffect(() => { // 새로고침
        call("/ingredient", "GET", null).then((response) => {
            setItems(response.data);
        });
    }, []);

    var ingredientItems = items.length > 0 && (
        <div style={{ marginLeft: 300, marginRight: 300 }}>
            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" class="col-md-3">이름</th>
                        <th scope="col" class="col-md-1">개수</th>
                        <th scope="col" class="col-md-2">유통기한</th>
                        <th scope="col" class="col-md-1">수정</th>
                        <th scope="col" class="col-md-1">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <IngredientList item={item} key={item.id} delete={deleteList} update={update} edit={edit_f} />
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ marginLeft: 300 }}>Recipe App</a>
                </div>
                <ul class="navbar-nav" style={{ marginRight: 300 }}>
                    <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                        <a class="nav-link" href="/">메인화면</a>
                    </li>
                </ul>
            </nav>
            <div>
                <form style={{ marginLeft: 300, marginRight: 300 }} onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>{edit}</legend>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="form-label mt-1">이름</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                id="Inputname"
                                placeholder="이름"
                                autocomplete="off"
                                name="name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="form-label mt-1">개수</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                id="InputCount"
                                placeholder="개수"
                                autocomplete="off"
                                name="count" />
                        </div>
                        <div class="form-group" style={{ width: 100 }}>
                            <label for="exampleInputPassword1" class="form-label mt-4">유통기한</label>
                            <DatePicker id="date" selected={startDate} onChange={date => setStartDate(date)} name="date" />
                        </div>
                        <button type="submit" class="btn btn-primary mt-3 me-2">Submit</button>
                        <button type="button" class="btn btn-primary mt-3" onClick={cancel}>Cancel</button>
                    </fieldset>
                </form>
            </div>
            {ingredientItems}
        </div>
    );
}

export default Ingredient;