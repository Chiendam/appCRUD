const $$ = document.querySelector.bind(document);

const btnSignup = $$("#btnSignup");
const btnLogin = $$("#btnLogin");
const btnAdd = $$("#btnSave");
console.log(btnAdd);

const inputPassword = $$("#password-field");
const inputEmail = $$("#email");
const inputName = $$("#fullname");

if(btnSignup) {
    btnSignup.addEventListener("click", signup)
}

if(btnLogin) {
    btnLogin.addEventListener("click", login)
}

if(btnAdd) {
    btnAdd.addEventListener("click", add)
}

async function signup(e) {
    try {
        const fullname = inputName.value
        const email = inputEmail.value
        const password = inputPassword.value

        if (!fullname || !password || !email)
            return alert("Username or password is not exsit")

        const response = await axios({
            method: "post",
            url: "/users/signup",
            data: {
                fullname: fullname,
                email: email,
                password: password,
            },
        });

        if(response.status === 200) {
            alert(`Create successful user ${response.data.user.fullname}`);
            location.href = "/users/login"
        } else {
            alert(`Create fail!!`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function login(e) {
    try {
        const email = inputEmail.value
        const password = inputPassword.value

        if (!password || !email)
            return alert("Username or password is not exsit")

        const response = await axios({
            method: "post",
            url: "/users/login",
            data: {
                email: email,
                password: password,
            },
        });

        if(response.status == 200) {
            alert(`Login successful user ${response.data.user.fullname}`);
            location.href = "/users/"
        } else {
            alert(`Create fail!!`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function add(e) {
    try {
        const fullName = $$("#fullNameAdd").value
        const password = $$("#passwordAdd").value
        const email = $$("#emailAdd").value

        if (!fullName || !password || !email)
            return alert("Username or password is not exsit")

        const response = await axios({
            method: "post",
            url: "/users/",
            data: {
                fullname: fullName,
                email: email,
                password: password,
            },
        });

        if(response.status == 200) {
            alert(`Create successful user ${response.data.user.fullname}`);
            location.href = "/users/"
        } else {
            alert(`Create fail!!`);
        }
    } catch (error) {
        console.log(error);
    }
}