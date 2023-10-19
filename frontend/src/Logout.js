
const Logout = () => {
    // local 스토리지에 토큰 삭제
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/"
    return 0;
}

export default Logout;