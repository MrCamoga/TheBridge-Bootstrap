const form = document.getElementById("createUserForm");

if (form) {
	form.addEventListener("submit", onSubmit);
	form.name.addEventListener("input", validateName);
	form.email.addEventListener("input", validateEmail);
	form.password.addEventListener("input", validatePassword);
	form.password.addEventListener("input", validatePassEqual);
	form.password2.addEventListener("input", validatePassEqual);
}

const ALERTFADEOUT = 3000;

function onSubmit(event) {
	event.preventDefault();

	if (!validateForm()) return;
	saveUser();
	form.reset();
	let alertSuccess = document.querySelector(".alert.alert-success");
	alertSuccess.classList.add("show");
	alertSuccess.classList.remove("d-none");
	setTimeout(() => {
		alertSuccess.classList.remove("show");
		alertSuccess.classList.add("d-none");
		window.location.href = "users.html";
	}, ALERTFADEOUT);
}

function validatePassword() {
	function toggleCheck(elemClass, bool) {
		let elem = document.querySelector(".requirement-" + elemClass);
		elem.querySelector(bool ? "i.text-danger" : "i.text-success").classList.add("d-none");
		elem.querySelector(bool ? "i.text-success" : "i.text-danger").classList.remove("d-none");
		return bool;
	}

	let password = form.password.value;

	let valid = toggleCheck("length", password.length >= 8);
	valid &= toggleCheck("number", /[0-9]/.test(password));
	valid &= toggleCheck("caps", /[A-Z]/.test(password));
	valid &= toggleCheck("nocaps", /[a-z]/.test(password));
	valid &= toggleCheck("special", /[^\w\s]/.test(password));

	let alert = document.querySelector(".form-pass .alert");
	document.querySelector(`.form-pass`).classList.add("was-validated");
	form.password.setCustomValidity(valid ? "" : "Contraseña no válida");
	if (valid) {
		alert.classList.remove("show");
		setTimeout(() => {
			alert.classList.add("d-none");
		}, 150);
		return true;
	}

	alert.classList.remove("d-none");
	setTimeout(() => {
		alert.classList.add("show");
	}, 150);
	setTimeout(() => {
		alert.classList.remove("show");
		setTimeout(() => {
			alert.classList.add("d-none");
		}, 150);
	}, ALERTFADEOUT);
	return false;
}

function validatePassEqual() {
	return validateField("form-pass2", form.password.value === form.password2.value, "Las contraseñas no coinciden");
}

function validateName() {
	return validateField("form-name", form.name.value !== "", "Introduce un nombre");
}

function validateEmail() {
	let re =
		/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
	return validateField("form-email", re.test(form.email.value), "Introduce un email válido");
}

function validateField(fieldClass, validation, errorText) {
	let alert = document.querySelector(`.${fieldClass} .alert`);
	document.querySelector(`.${fieldClass} input`).setCustomValidity(validation ? "" : errorText);
	document.querySelector(`.${fieldClass}`).classList.add("was-validated");
	if (!validation) {
		alert.classList.remove("d-none");
		setTimeout(() => {
			alert.classList.add("show");
		}, 150);
		alert.textContent = errorText;
		setTimeout(() => {
			alert.classList.remove("show");
			setTimeout(() => {
				alert.classList.add("d-none"); // display none after fade out
			}, 150);
		}, ALERTFADEOUT);
		return false;
	}

	alert.classList.remove("show");
	setTimeout(() => {
		alert.classList.add("d-none");
	}, 150);

	return true;
}

function validateForm() {
	return validateName() && validateEmail() && validatePassword() && validatePassEqual();
}

function saveUser() {
	const userData = {
		name: form.name.value,
		email: form.email.value,
	};
	let json = JSON.stringify(userData);
	let storeddata = localStorage.userdata;
	console.log(storeddata, json);
	localStorage.setItem("userdata", storeddata === undefined ? json : storeddata + "," + json);
}

function printUsers() {
	if (localStorage.userdata === undefined) return;
	const userData = JSON.parse("[" + localStorage.userdata + "]");

	const cardContainer = document.getElementById("cardContainer");
	for (let i = 0; i < userData.length; i++)
		cardContainer.innerHTML += `
          <div class="card border-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">Usuario #${i + 1}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${userData[i].name}</h5>
              <p class="card-text"><a class="text-decoration-none" href="mailto:${userData[i].email}">${
			userData[i].email
		}</a></p>
            </div>
          </div>
        `;
}

if (document.getElementById("cardContainer")) {
	printUsers();
}