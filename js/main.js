const form = document.getElementById("createUserForm");
form?.addEventListener("submit",onSubmit);

form?.name.addEventListener("input",validateName);
form?.email.addEventListener("input",validateEmail);
form?.password.addEventListener("input",validatePassword);
form?.password.addEventListener("input",validatePassEqual);
form?.password2.addEventListener("input",validatePassEqual);

const ALERTFADEOUT = 3000;

function onSubmit(event) {
    event.preventDefault();
    
    if(!validateForm()) return;
    saveUser();
}

function validatePassword() {
    let invalid = false;
    let length = document.querySelector(".requirements.req-length");
    let number = document.querySelector(".requirements.req-number");
    let caps = document.querySelector(".requirements.req-caps");
    let nocaps = document.querySelector(".requirements.req-nocaps");
    let special = document.querySelector(".requirements.req-special");
    function toggleTick(elem, bool) {
        elem.querySelector(bool ? "i.text-danger":"i.text-success").classList.add("d-none");
        elem.querySelector(bool ? "i.text-success":"i.text-danger").classList.remove("d-none");
        invalid |= !bool;
    }
    toggleTick(length,/.{8,}/.test(form.password.value));
    toggleTick(number,/[0-9]/.test(form.password.value));
    toggleTick(caps,/[A-Z]/.test(form.password.value));
    toggleTick(nocaps,/[a-z]/.test(form.password.value));
    toggleTick(special,/[^\w\s]/.test(form.password.value));

    let alert = document.querySelector(".form-pass .alert");
    form.password.setCustomValidity(invalid ? "error":"")
    if(invalid) {
        alert.classList.add("show");
        setTimeout(() => {
            alert.classList.remove("show");
        },ALERTFADEOUT);
        return false;
    }

    alert.classList.remove("show");
    return true;
}

function validatePassEqual() {
    return validateField("form-pass2",form.password.value === form.password2.value,"Las contaseñas no coinciden");
}

function validateName() {
    return validateField("form-name",form.name.value!=="","Introduce un nombre")
        && validateField("form-name",/^[^0-9]+$/.test(form.name.value),"Introduce un nombre valido");
}

function validateEmail() {
    let re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    return validateField("form-email",re.test(form.email.value),"Introduce un email válido");
}

function validateField(fieldClass, validation, errorText) {
    let alert = document.querySelector(`.${fieldClass} .alert`);
    document.querySelector(`.${fieldClass} input`).setCustomValidity(validation ? "":errorText);
    if(!validation) {
        // alert.classList.remove("d-none");
        alert.classList.add("show");
        alert.textContent = errorText;
        setTimeout(() => {
            alert.classList.remove("show"); 
            // alert.classList.add("d-none")
        }, ALERTFADEOUT);
        return false;
    }
    alert.classList.remove("show");
    // alert.classList.add("d-none");
    return true;
}

function validateForm() {
    return validateEmail() & validateName() & validatePassword() & validatePassEqual();
}

function saveUser() {
    const userData = {
        name: form.name.value,
        email: form.email.value
    }
    let json = JSON.stringify(userData);
    let storeddata = localStorage.userdata;
    console.log(storeddata,json)
    localStorage.setItem("userdata", storeddata === undefined ? json:storeddata+","+json)
}