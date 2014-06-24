jQuery(function() { 
	jQuery.ajax({
		url: "data/states.json",
		dataType: "json",
		success: function(stateList) {
			for(var i=0;i<stateList.items.length;i++){
				jQuery("#dropDownDest").append(jQuery("<li><a>"+stateList.items[i].name+"</a></li>"));
			}
		}
	});		
});
