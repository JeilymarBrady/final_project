$(document).ready(function() {
	$('#register').click(function(evt) {
		evt.preventDefault();
		$('#login').fadeOut('slow');
		$('#sub').fadeOut('slow');
		$('#formTitle').fadeOut('slow', function() {
			$(this).replaceWith('<p id="formTitle">Register</p>');
		});
		$('#username').attr('id', 'newuser');
		$('#username').next().attr('for', 'newuser');
		$('#pass').attr('id', 'newpass');
		$('#pass').next().attr('for', 'newpass');
	});
});