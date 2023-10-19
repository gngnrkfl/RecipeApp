import { Button, Card, CardFooter } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import './bootstrap.css';
import { call } from './service/ApiService';

function App() {
    const [recipe, setRecipe] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 초기값은 true로 설정
    var ingredient = (<a href='/'></a>);
    var login = (<a href='/'></a>);
    var editUser = (<a href='/'></a>);

    function openRecipe() {
        document.getElementById("recipeModal").style.display = "block";
    }

    function closeRecipe() {
        document.getElementById("recipeModal").style.display = "none";
    }

    var recipeItems = recipe.length > 0 && (
        recipe.map((item, idx) => (
            <div style={{ width: '18rem', height: 500, margin: 10 }}>
                <Card style={{ width: '18rem', margin: 10, height: 500 }}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                    <CardFooter>
                        <Button variant="primary" onClick={openRecipe}>레시피 보기</Button>
                    </CardFooter>
                </Card>
                <div class="modal" id="recipeModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{item.name}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"></span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>재료 : </p>
                                {/* 레시피 보기 버튼 마저 완성 */}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeRecipe}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    );

    var Loding = (<div><h1>로딩중</h1></div>);

    if (localStorage.getItem("ACCESS_TOKEN") === "null") {
        ingredient = null;
        login = (<a class="nav-link" href="/login">로그인</a>);
        editUser = null;
    } else {
        ingredient = (<a class="nav-link" href="/ingredient">재료관리</a>);
        login = (<a class="nav-link" href="/logout">로그아웃</a>);
        editUser = (<a class="nav-link" href="/edituser">정보수정</a>)
    }

    useEffect(() => { // 새로고침
        call("/", "GET", null).then((response) => {
            console.log(response);
            setRecipe(response);
            setIsLoading(false);
        });
    }, []);

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
                    {isLoading ? Loding : recipeItems}
                </div>
            </div>
        </div>
    );
}

export default App;
