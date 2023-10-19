import { Button, Card } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import './bootstrap.css';

function App() {
    const [recipe, setRecipe] = useState([{ title: "김치찌개", text: "맛있는 김치찌개" }, { title: "된장찌개", text: "맛있는 된장찌개" }, { title: "된장찌개", text: "맛있는 된장찌개" }, { title: "된장찌개", text: "맛있는 된장찌개" }]);
    var ingredient = (<a href='/'></a>);
    var login = (<a href='/'></a>);
    var editUser = (<a href='/'></a>);

    var recipeItems = recipe.length > 0 && (
        recipe.map((item, idx) => (
            <Card style={{ width: '18rem', margin: 10, height: 500 }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.text}
                    </Card.Text>
                    <Button variant="primary">레시피 보기</Button>
                </Card.Body>
            </Card>
        ))
    );

    if (localStorage.getItem("ACCESS_TOKEN") === "null") {
        ingredient = null;
        login = (<a class="nav-link" href="/login">로그인</a>);
        editUser = null;
    } else {
        ingredient = (<a class="nav-link" href="/ingredient">재료관리</a>);
        login = (<a class="nav-link" href="/logout">로그아웃</a>);
        editUser = (<a class="nav-link" href="/edituser">정보수정</a>)
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ marginLeft: 300 }}>Recipe App</a>
                </div>
                <ul class="navbar-nav" style={{ marginRight: 300 }}>
                    <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                        {editUser}
                    </li>
                    <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                        {ingredient}
                    </li>
                    <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                        {login}
                    </li>
                </ul>
            </nav>
            <div style={{ paddingTop: 30 }}>
                <div class="input-group m-auto" style={{ width: 800 }}>
                    <input type="text" class="form-control" placeholder="레시피 검색" aria-label="레시피 검색" aria-describedby="button-addon2" />
                    <button class="btn btn-primary" type="button" id="button-addon2">검색</button>
                </div>
            </div>
            <div >
                <div style={{ width: 1300 }} className="m-auto d-flex col-lg-10 col-md-12 row p-3">
                    {recipeItems}
                </div>
            </div>
        </div>
    );
}

export default App;
