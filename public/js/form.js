$(document).ready(function() {
	$('#register').click(function(evt) {
		evt.preventDefault();
		$('#login').fadeOut('slow');
		$('#sub').fadeOut('slow');
		$('#user-input').attr('id', 'user-input-login');
		$('#formTitle').fadeOut('slow', function() {
			$(this).replaceWith('<p id="formTitle">Register</p>');
		});
	});
	$('#login').click(function(evt) {
		evt.preventDefault();
		console.log('Collect user information.')
	});
	$('#register').replaceWith('<button id="submit">Login</button>');
});