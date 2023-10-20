import { API_BASE_URL } from "../api-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            console.log("Ooops!");
            if (error.status === 403) {
                window.location.href = "/";
            }
            return Promise.reject(error);
        });
}

export function recipeCall(api, method, request){
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        options.body = JSON.stringify(request);
    }
    fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            console.log("Ooops!");
        });
}

// 로그인을 위한 API 서비스 메소드 signin
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO).then((res) => {
        if (res.token) {
            // local 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, res.token);
            // token이 존재하는 경우 todo 화면으로 리디렉트
            window.location.href = "/";
        }
    });
}

// 회원가입 요청
export function signup(userDTO) {
    console.log(userDTO);
    return call("/auth/signup", "POST", userDTO).then((res) => {
        if (res.id) {
            window.location.href = "/";
        }
    }).catch((err) => {
        console.log("Oops!");
        console.log(err.status);
        console.log("Ooops!")
        if (err.status === 403) {
            window.location.href = "/login";
        }
        return Promise.reject(err);
    });
}

export function edituser() { // 정보수정으로 이동
    window.location.href = "/edituser";
}

export function edit(userDTO) {
    return call("/auth/edit", "POST", userDTO).then((res) => {
        if (res.id) {
            window.location.href = "/";
        }
    });
}

export function remove(userDTO) {
    return call("/auth/remove", "POST", userDTO).then((res) => {
        if (res.id) {
            window.location.href = "/logout";
        }
    });
}
