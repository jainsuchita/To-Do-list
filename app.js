var itemTemplate = $('#templates .item')
var list         = $('#list')

var addItemToPage = function(itemData) {
  var item = itemTemplate.clone()
  item.attr('data-id',itemData.id)
  item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}

var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/jainsuchita38/"
})

loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})

$('#add-form').on('submit', function(event) {
  var itemDescription = event.target.itemDescription.value;
  event.preventDefault();
  //alert('trying to create a new item with a description ' + itemDescription)
  var creationRequest = $.ajax({
	  type: 'POST',
	  url: "http://listalous.herokuapp.com/lists/jainsuchita38/items",
	  data: { description: itemDescription, completed: false }
	})
  creationRequest.done(function(itemDataFromServer) {
	  addItemToPage(itemDataFromServer)
	})
})


//MArking an item As Complete
// Step1: First off, the event listener is slightly more complex. Instead of binding a listener to a single form, we'll be binding a listener to every check mark in the list. jQuery's .on function allows you to do this, using event delegation.
$('#list').on('click', '.complete-button', function(event) {
  //alert('trying to complete an item!')

  //Step2: Now, we're going to get all the information we need from the page. 

  	var item = $(event.target).parent(); //parent of the list-item which has been clicked. i.e. <Li> element
	var isItemCompleted = item.hasClass('completed')
	var itemId = item.attr('data-id')
	//alert('clicked item ' + itemId + ', which has completed currently set to ' + isItemCompleted)

	// Step3: Now that we have the necessary information, we'll make another request to the server.
	var updateRequest = $.ajax({
	  type: 'PUT',
	  url: "https://listalous.herokuapp.com/lists/jainsuchita38/items/" + itemId,
	  data: { completed: !isItemCompleted }
	})


	//Step4: Finally, we'll update the item that has been marked as incomplete or complete. Instead of creating a new item, we'll simple add or remove the class 'completed' from the specified item (using jQuery's helpful addClass and removeClass functions). 
	updateRequest.done(function(itemData) {
	  if (itemData.completed) {
	    item.addClass('completed')
	  } else {
	    item.removeClass('completed')
	  }
	})
})
