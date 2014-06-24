jQuery(function() {
    
    jQuery('#start-progress-ref-A,#start-progress-ref-D').click(function() {
        var relEl = jQuery(this).data('rel');
        new gXwt_lite.progressbar().timerBased(relEl);
    });
    
    jQuery('#start-progress-ref-B').click(function() {
        var relEl = jQuery(this).data('rel');
        new gXwt_lite.progressbar().decimalBased(relEl);
    });
    
    jQuery('#progress-ref-C').keyup(function() {
        var maxlength = jQuery(this).attr('maxlength'),
            progress = jQuery('#progress-3'),
            jQuerybar = jQuery('.progress-bar', progress),
            jQuerypercText = jQuery('.progress-percentage', progress);
            
        var charLength = jQuery(this).val().length;
        var barPerc = ((charLength * 100) / maxlength);
        jQuerybar.css('width', barPerc + '%');
        jQuerypercText.text(charLength + ' out of ' + maxlength
                + ' max chars');
    });
});
