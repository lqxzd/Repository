
function checkForm() {
    //用户名不能为空
    var username = document.addUserForm.username.value;
    if (username.trim() == "") {
        alert("用户名不能为空");
        return false;
    }
    //密码格式
    var password = document.addUserForm.userPassword.value;
    if (password.trim() == "" || password.length < 6) {
        alert("密码不能少于6位");
        return false;
    }
    //两次密码要一致
    var repassword = document.addUserForm.userRePassword.value;
    if (password != repassword) {
        alert("两次密码不一致");
        return false;
    }
    //昵称不能为空
    var nickname = document.addUserForm.nickname.value;
    if (nickname.trim() == "") {
        alert("昵称不能为空");
        return false;
    }
    //邮箱格式
    var email = document.addUserForm.userEmail.value;
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        alert("邮箱格式不正确");
        return false;
    }
}