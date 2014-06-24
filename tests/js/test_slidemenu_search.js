jQuery('#search').keyup(function(){
   var searchText = jQuery(this).val().toLowerCase();
   jQuery('.search-close-icon, #listed-nav-menu ul').show();
   var noSearchResult =0;
    if(searchText == ""){
        jQuery('#listed-nav-menu ul li >a, #listed-nav-menu ul > li, .xwtSlideMenuIndex').show();
		jQuery('.search-close-icon, .noSearchResult').hide();
		noSearchResult =1;
    } 	
	else {
		jQuery('#listed-nav-menu ul').removeClass('nav-highlight');
        jQuery('#listed-nav-menu ul li > a').each(function(){
            var searchDataList = jQuery(this).text().toLowerCase(); 
            var searchDataList = searchDataList.indexOf(searchText);
            if (searchDataList >= 0) {
                jQuery(this, '.search-close-icon').show();
				noSearchResult = 1;
		        jQuery('.noSearchResult').hide();
				jQuery(this).closest('ul').addClass('nav-highlight').show();				
            } else {			
                jQuery(this, '#listed-nav-menu ul > li').hide();
            }
		});
		jQuery('#listed-nav-menu ul').not('.nav-highlight').hide();
   };
   if (noSearchResult == 0) {
        jQuery("#listed-nav-menu .panel-body").append('<ul class="nav"><li class="subMenuItem noSearchResult"><a>No data available</a></li></ul>');
    }
});
jQuery('.search-close-icon').click(function(){
	jQuery('#search').val("");
	jQuery('#listed-nav-menu ul li >a, #listed-nav-menu ul > li, #listed-nav-menu ul ').show();
	jQuery('.search-close-icon, .noSearchResult').hide();
});
jQuery('#search').click(function(){
	jQuery('.prime-slide-menu label[href="#tab-listed-menu"]').trigger('click');
});