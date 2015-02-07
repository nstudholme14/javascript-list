var itemTemplate = $('#templates .item')
var list = $('#list')

var addItemToPage = function(itemData) {
	//make a copy of what itemTemplate is
	var item = itemTemplate.clone();
	//setting the id attribute
	item.attr('data-id', itemData.id);
	//
	item.find('.description').text(itemData.description);
	if(itemData.completed) {
		item.addClass('completed');
	};
	list.append(item);
};


var loadRequest =$.ajax({
	type: 'GET',
	url: "https://listalous.herokuapp.com/lists/HappyDayToDoList/"
})



loadRequest.done(function(dataFromServer){
	var itemsData = dataFromServer.items
	itemsData.forEach(function(itemData){
		addItemToPage(itemData)
	})
})



$('#add-form').on('submit', function(event) {
	itemDescription = event.target.itemDescription.value
	event.preventDefault()
	var creationRequest = $.ajax({
		type: 'POST',
		url: "http://listalous.herokuapp.com/lists/HappyDayToDoList/items",
		data: {description: itemDescription, completed: false}
	})

creationRequest.done(function(itemDataFromServer) {
			addItemToPage(itemDataFromServer)
		})
})



$('#list').on('click', '.complete-button', function(event) {
	var item = $(event.target).parent()
	isItemCompleted = item.hasClass('completed')
	var itemId = item.attr('data-id')
	var updateURL = 'https://listalous.herokuapp.com/lists/HappyDayToDoList/items/' +itemId;
	var updateRequest = $.ajax({
		type: 'PUT',
		url: updateURL,
		data: {completed: !isItemCompleted }}	)

				updateRequest.done(function(itemData){
		if (itemData.completed) {
			item.addClass('completed') 
		}
		else {
			item.removeClass('completed')
		}

	})

	})



$('#list').on('click', '.delete-button', function(event) {
	var item = $(event.target).parent()
	var itemId = item.attr('data-id')
	var updateURL = 'https://listalous.herokuapp.com/lists/HappyDayToDoList/items/' +itemId;
	var updateRequest = $.ajax({
		type: 'DELETE',
		url: updateURL,
		}	)
	$('li[data-id="'+itemId+'"]').remove();
 })



// $('#list').on('click', function(event) {
// 	var $li = $('li'), isEditable=$li.is('.editable');
// 	var itemId = item.attr('data-id')
// 	$div.prop('contenteditable', !isEditable)
//  })




