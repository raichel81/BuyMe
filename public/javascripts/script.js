$(document).ready(function() {

	$("a.delete-btn").click(function(e){
		console.log(this.getAttribute('href'));
		e.preventDefault();
	    $.ajax({
	        url: this.getAttribute('href'),
	        type: 'DELETE',
	        success: function(data) {
	        	window.location.reload();
		    }
		});
	});

});

function addItemToWishlist(itemIndex, wishlistId) {
	console.log('hi');
	var itemInfoForm = $("#item-" + itemIndex);
	var wishlistIdField = itemInfoForm.find(".wishlistIdField");
	wishlistIdField.val(wishlistId);
	itemInfoForm.submit();
}
