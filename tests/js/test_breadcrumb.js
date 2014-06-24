var mbc;
var initItems = [ {
	label : 'Home',
	destination : 'http://wwwin.cisco.com'
}, {
	label : 'Level1.1',
	destination : 'http://wwwin.cisco.com'
}, {
	label : 'Level1.1.1',
	destination : 'http://wwwin.cisco.com'
} ];

jQuery(document).ready(
		function() {
			mbc = jQuery('#breadcrumb').breadcrumb({
				items : initItems,
				ellipses : true,
				ellipses_counter : 4
			});

			jQuery('#addLinked').click(function() {
				mbc.push([ {
					label : 'Item ' + (jQuery('#breadcrumb li').length + 1),
					destination : 'http: //wwwin.cisco.com'
				} ]);
			});

			jQuery('#addNonLinked').click(function() {
				mbc.push([ {
					label : 'Item ' + (jQuery('#breadcrumb li').length + 1)
				} ]);
			});

			jQuery('#removeLast').click(function() {
				mbc.pop();
			});

			jQuery('#reset').click(function() {
				mbc.reset();
				mbc.push(initItems);
			});

			jQuery('#show_ellipses').change(function() {
				mbc.setParam('ellipses', jQuery(this).is(':checked'));
			});

			jQuery('#set_ellipses').click(
					function() {
						mbc.setParam('ellipses_counter', parseInt(jQuery(
								'#ellipses_counter').val()));
					});
		})