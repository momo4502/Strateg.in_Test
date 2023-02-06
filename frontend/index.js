function getValue(enter){
    var input = document.getElementById(enter);
    if(typeof input !== 'undefined' && input !== null) {
      return input.value;
    }
  }

  function login(){
    fetch('http://localhost:3000/api/login',{
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(
        {
          email: String(getValue("email")),
          password: String(getValue("password"))
        }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let hasExecuted = false;
    if (!hasExecuted) {
      window.location.href='users.html';
      hasExecuted = true;
    }
    });
  };

  function register(){
    fetch('http://localhost:3000/api/register',{
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(
        {
          email: String(getValue("email")),
          password: String(getValue("password"))
        }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let hasExecuted = false;
        if (!hasExecuted) {
          window.location.href='users.html';
          hasExecuted = true;
        }
    });
  };
  