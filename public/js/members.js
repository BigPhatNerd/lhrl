$(document).ready(function() {
    $.get('/api/user_data').then(data => {
        $('.member-name').text(data.email);
    });
});