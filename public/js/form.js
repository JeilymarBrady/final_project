$(document).ready(function() {
	$('#user-input-login').hide();
	$('#register').click(function(evt) {
		evt.preventDefault();
		$('#user-input').fadeOut(500);
		$('#sub').fadeOut(500);
		$('#register').fadeOut(500, function() {
			$('#user-input-login').fadeIn(500);
		});
	});
});
