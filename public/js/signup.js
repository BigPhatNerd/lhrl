$(document).ready(() => {
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    signUpForm.on('submit', (event) => {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim();
            password: passwordInput.val().trim();
        };

        if(!userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    //Does a post to the signup route. If successful, we are redirected to the members page.
    //Otherwise we log any errors.

    const signUpUser = (email, password) => {
        $.post("/api/signup", {
                email: email,
                password: password
            })
            .then(data => {
                window.location.replace('/members');
            })
            .catch(handleLoginErr);
    }

    const handleLoginError = err => {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
})