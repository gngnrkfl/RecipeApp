import React from "react";
import { signup } from "./service/ApiService";
import { Container, Grid, TextField, Typography, Link } from "@material-ui/core";

const SignUp = (props) => {
    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        signup({ email: email, username: username, password: password }).then((res) => {
            window.location.href = "/login";
        });
    }

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        계정 생성
                    </Typography>
                </Grid>
                <Grid item xs={12}>
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="current-password"
                        name="password"
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        label="패스워드"
                        autoFocus
                        type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <button type="submit" class="btn btn-primary w-100" variant='contained'>계정 생성</button>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default SignUp