import { Container, Grid, TextField } from "@material-ui/core";
import React from "react";
import { edit, remove } from "./service/ApiService";
import './bootstrap.css';

const EditUser = () => {
    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        edit({ email: email, username: username, password: password }).then((res) => {
            window.location.href = "/logout";
        });
    }

    function userRemove() {
        const email = localStorage.getItem('email');
        const password = prompt("비밀번호를 입력하세요", "");
        remove({ email: email, password: password }).then((res) => {
            window.location.href = "/logout";
        });
    }

    var editform = (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        autoFocus
                        value={localStorage.getItem('email')}
                        aria-readonly
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop:10}}>
                    <TextField
                        autoComplete="username"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="사용자 이름"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop:10}}>
                    <TextField
                        autoComplete="current-password"
                        name="password"
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        label="패스워드"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop:10}}>
                    <button type="submit" class="btn btn-primary w-100" variant='contained'>정보변경</button>
                </Grid>
                <Grid item xs={12} style={{marginTop:10}}>
                    <button type="button" class="btn btn-primary w-100" variant='contained' onClick={userRemove}>회원탈퇴</button>
                </Grid>
            </form>
        </Container>
    );

    var navigationBar = (
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/edituser" style={{ marginLeft: 300 }}>유저정보 수정</a>
            </div>
            <ul class="navbar-nav" style={{ marginRight: 300 }}>
                <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                    <a class="nav-link" href="/">뒤로가기</a>
                </li>
            </ul>
        </nav>
    );

    return (
        <div>
            {navigationBar}
            {editform}
        </div>
    )
}

export default EditUser;