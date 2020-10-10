$(document).ready(function() {
            var loginForm = $('form.login');
            var emailInput = $('input#email-input');
            var passwordInput = $("input#password");

            loginForm.on("submit", e => {
                e.preventDefault();
                var userData = {
                    email: emailInput.val().trim();
                    password: passwordInput.val().trim();
                }

                if(!userData.email || !userData.password) {
                    return;
                }

                loginUser(userData.email, userData.password);
                emailInput.val("");
                passwordInput.val("");
            });

            loginUser(email, password) => {
                $.post('api/login', {
                        email: email,
                        password: password
                    })
                    .then(() => {
                            window.location.replace('/members');
                            //If there is an error, log the error
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    })