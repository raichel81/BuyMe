$(document).ready(function() {

	$("a.delete-btn").click(function(e){
		e.preventDefault();
	    $.ajax({
	        url: this.getAttribute('href'),
	        type: 'DELETE',
	        success: function(data) {
    	        window.location.href = '/wishlists';
		    }
		});
	});

});
