function checkForm() {
    //名字不能为空
    var username = document.myForm_2.myName.value;
    if (username.trim() == "") {
        alert("姓名不能为空");
        return false;
    }
    //手机号
    var phone = document.myForm_2.myPhone.value;
    if (!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(phone))) {
        alert("手机号码有误，请重填");
        return false;
    }
}