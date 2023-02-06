document.addEventListener('DOMContentLoaded', function getAllUsers(){
    fetch('http://localhost:3000/api/users',{
    method: "GET",
    headers: { "Content-Type": "application/json" }, 
    })
        .then(response => response.json())
        .then(users => {
            var usersTab = new Array();
            users.forEach(user => {
                console.log(user.email);
                usersTab.push(user.email);
            });
            var list = document.getElementById("list");
            for (var i = 0; i < usersTab.length; i++) {
                var item = document.createElement("li");
                item.innerHTML = usersTab[i];
                list.appendChild(item);
            }
        });
})