import React, { useEffect, useState } from "react";
import { signin } from "./service/ApiService";
import { Checkbox, Container, Grid, Link, TextField, Typography } from "@material-ui/core";

const Login = (props) => {
    const [userid, setUserid] = useState("");
    const [isRemember, setIsRemember] = useState(false); // 아이디 저장 체크박스 체크 유무

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("email", userid);
        let id = localStorage.getItem("rememberUserId"); // 정보 수정때 쓸 용도

        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password");

        // 아이디 저장을 누른 채 아이디를 변경해서 로그인 할 시
        if (id !== email && id === undefined) { localStorage.setItem("rememberUserId", userid); }

        // ApService의 signin 메소드를 사용해 로그인
        signin({ email: email, password: password });
    }

    function handleOnChange(e) {
        setIsRemember(e.target.checked);
        console.log(userid);
        if (e.target.checked) {
            localStorage.setItem("rememberUserId", userid);
        } else {
            localStorage.removeItem("rememberUserId");
        }
    }

    useEffect(() => {
        let id = localStorage.getItem("rememberUserId");
        if (id !== null) {
            setUserid(id);
            setIsRemember(true);
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Typography component="h1" variant="h4" style={{margin:"auto", marginBottom:20}}>
                    로그인
                </Typography>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            value={userid}
                            onChange={(e) => { setUserid(e.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            name="password"
                            autoComplete="password"
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Checkbox checked={isRemember} onChange={handleOnChange} />
                        아이디 저장
                    </Grid>
                    <Grid item xs={12}>
                        <button type="submit" class="btn btn-primary w-100" variant='contained'>로그인</button>
                    </Grid>
                    <Link href="/signup" variant="body2">
                        <Grid item>
                            계정이 없습니까? 여기서 가입하세요
                        </Grid>
                    </Link>
                </Grid>
            </form>
        </Container>);
}

export default Login;