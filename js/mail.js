
const url = "https://api.tikitakaapp.cl/contacform"
const sendMail = (name, lastname, phone, mail, message) => {
    let alertSuccess = document.getElementById('success')
    let alertError = document.getElementById('error')
    const f = new FormData();
    f.append("name", name);
    f.append("lastname", lastname);
    f.append("mail", mail);
    f.append("message", message);
    f.append("phone", phone);
    fetch(url, { method: "POST", body: f })
        .then(res => res.json())
        .then(response => {
            alertSuccess.style.display = "block";
            alertError.style.display = "none";
        })
        .catch(err => {
            console.log(err)
            alertSuccess.style.display = "none";
            alertError.style.display = "block";
        })
}

const activeAlert = (node, bool) => {
    let parent = node.parentNode;
    let span = parent.querySelector('.alert-form');
    span.style.display = bool ? 'block' : 'none';
}

const validForm = () => {
    let name = document.getElementById('name');
    let lastname = document.getElementById('lastname');
    let phone = document.getElementById('phone');
    let mail = document.getElementById('mail');
    let message = document.getElementById('message');

    if (name == null || name.value.length == 0 || name.value === "") {
        activeAlert(name, true)
        return false;
    } else activeAlert(name, false)

    if (lastname == null || lastname.value.length == 0 || lastname.value === "") {
        activeAlert(lastname, true)
        return false;
    } else activeAlert(lastname, false)

    let rt = /^\D[+56]\d[2-9]\d{8}$/g;
    if (!rt.test(phone.value)) {
        activeAlert(phone, true)
        return false;
    } else activeAlert(phone, false)

    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!regex.test(mail.value)) {
        activeAlert(mail, true)
        return false;
    } else activeAlert(mail, false)

    if (message == null || message.value.length == 0 || message.value === "") {
        activeAlert(message, true)
        return false;
    } else activeAlert(message, false)

    sendMail(name.value, lastname.value, phone.value, mail.value, message.value);

}


document.addEventListener('DOMContentLoaded', function () {
    let btn = document.getElementById('send');
    btn.addEventListener('click', validForm);
})