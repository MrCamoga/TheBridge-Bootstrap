function printUsers() {
    if(localStorage.userdata === undefined) return;
    const userData = JSON.parse("["+localStorage.userdata+"]");
    
    const cardContainer = document.querySelector(".cardContainer");
    for(let i = 0; i < userData.length; i++) 
        cardContainer.innerHTML += `
          <div class="card border-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">Usuario #${i+1}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${userData[i].name}</h5>
              <p class="card-text"><a class="text-decoration-none" href="mailto:${userData[i].email}">${userData[i].email}</a></p>
            </div>
          </div>
          `
}

printUsers();