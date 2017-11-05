// setup for login form
var loginForm = $('#loginForm');
console.log(loginForm);
loginForm.on('submit', function(event) {
    window.alert(event);
    event.preventDefault();
    var username = loginForm.find('input[name=username]').val().trim();
    var password = loginForm.find('input[name=password]').val().trim();
    window.alert(username);
    window.alert(password);
});