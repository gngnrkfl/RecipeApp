import { Button, Card, CardFooter } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import './bootstrap.css';
import { call, recipeCall } from './service/ApiService';
import Recipe from './Recipe';

function App() {
    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 초기값은 true로 설정
    const [selectedRecipe, setSelectedRecipe] = useState(null); //레시피 보기 버튼을 누르면 나오는 레시피
    const [searchItem, setSearchItem] = useState();
    var ingredient = (<a href='/'></a>);
    var login = (<a href='/'></a>);
    var editUser = (<a href='/'></a>);

    function openRecipe(idx) {
        setSelectedRecipe(recipe[idx]);
        document.getElementById("recipeModal").style.display = 'block';
    }

    function onInputChange(e) {
        console.log(e.target.value);
        setSearchItem(e.target.value);
    }

    function onButtonClick() {
        setIsLoading(true);
        var item = { name: searchItem }
        recipeCall("/", "POST", item).then((response) => {
            setIsLoading(false)
            setRecipe(response)
        }
        );
        setSearchItem("");
    }

    function enterKeyEventHandler(e) {
        if (e.key === 'Enter') {
            onButtonClick();
        }
    }

    function handleClick(category) {
        
    }

    var recipeItems = recipe && recipe.length > 0 && (
        recipe.map((item, idx) => (
            <div style={{ width: '18rem', height: 500, margin: 10 }}>
                <Card style={{ width: '18rem', margin: 10, height: 500 }}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                    <CardFooter>
                        <Button variant="primary" onClick={() => openRecipe(idx)}>레시피 보기</Button>
                    </CardFooter>
                </Card>
            </div>
        ))
    );

    var Loading = (<div><h1>로딩중</h1></div>);

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
        if (localStorage.getItem("ingredient") !== null) {
            setIsLoading(true);
            let ingredient = localStorage.getItem("ingredient");
            let item = { name: ingredient };
            console.log(item);
            recipeCall("/", "POST", item).then((response) => {
                console.log(response);
                setIsLoading(false);
                setRecipe(response);
                localStorage.removeItem("ingredient");
            }).catch((error) => {
                console.error("오류 발생:", error);
            });
        } else {
            call("/", "GET", null).then((response) => {
                setRecipe(response);
                setIsLoading(false);
            });
        }
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
                    <input
                        type="text"
                        class="form-control"
                        placeholder="레시피 검색"
                        aria-label="레시피 검색"
                        aria-describedby="button-addon2"
                        onChange={onInputChange}
                        onKeyDown={enterKeyEventHandler}
                        value={searchItem} />
                    <button
                        class="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        onClick={onButtonClick}>검색</button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('전체')}>전체</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('밑반찬')}>밑반찬</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('메인반찬')}>메인반찬</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('국/탕')}>국/탕</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('찌개')}>찌개</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('면/만두')}>면/만두</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('밥/죽/떡')}>밥/죽/떡</button>
                    <button class="btn btn-info" style={{ margin: '5px' }} onClick={() => this.handleClick('김치/젓갈/장류')}>김치/젓갈/장류</button>
                </div>
            </div>
            <div >
                <div style={{ width: 1300 }} className="m-auto d-flex col-lg-10 col-md-12 row p-3">
                    {isLoading ? Loading : recipeItems}
                </div>
            </div>
            <Recipe selectedRecipe={selectedRecipe} />
        </div>
    );
}

export default App;
