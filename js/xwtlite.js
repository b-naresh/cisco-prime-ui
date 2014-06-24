$.noConflict();
var gXwt_lite = {};

gXwt_lite.config = {
	_context : "xwtlite",
	_basepath : "",
	_path : {
		"header" : "tmpl/ui_shell/header.html",
		"slideMenu" : "tmpl/ui_shell/slide_menu.html",
		"about" : "tmpl/about_box/about_box.html",
		"login" : "tmpl/login/login.html"
	},
	_misc : {
		"app" : "start"
	}
}

/*
 * DOM READY
 */
jQuery(function() {
	gXwt_lite.draggable();
	gXwt_lite.leftoffset="25rem";
	//gXwt_lite.loadComponents();
	gXwt_lite.initComponents();
	gXwt_lite.loadNavigations();
	jQuery(".xwtlite").on("click", "[data-xl-rel='nav-link']", function(event) {
                event.preventDefault();
		var href=jQuery(this).data('xl-href');
		gXwt_lite.goto(href);
	});
	jQuery(".xwtlite").on("click", ".toggle-slide-lr", function(event) {
		if (jQuery(".toggle-slide-lr").hasClass("disabled")) {
			return false;
		}
		jQuery(".toggle-slide-lr").toggleClass("isOpen");
		if (jQuery(".toggle-slide-lr").hasClass("isOpen")) {
			jQuery("#prime-slide-menu").animate({
				"left" : "0"
			}, "fast",function(){jQuery(".xwtSlideMenuIndex").show();});
			jQuery("#prime-header").animate({
				"left" : gXwt_lite.leftoffset
			}, "fast");
			jQuery("#prime-app-container").animate({
				"left" : gXwt_lite.leftoffset
			}, "fast");
		} else {
			gXwt_lite.hideSlideMenu();
		}
		event.stopPropagation();
	});  
	jQuery(".xwtlite").on("click", "#prime-slide-menu .icon-pin", function(event) {
        event.preventDefault();
        jQuery(this).toggleClass("active");
        jQuery(".toggle-slide-lr").toggleClass("disabled");
	});
	
	
    jQuery(".xwtlite").on("click", ".toggle-slide-search", function(e) {
        e.preventDefault();
        jQuery(this).hide();
        var parent = jQuery(this).parents('li:first');
        jQuery('.navbar-form', parent).css('width', 0).show().animate({width: '197px'}, 200);
        jQuery('.form-control', parent).focus();
    }); 
    jQuery(".xwtlite").on("blur", ".searchapp .form-control", function() {
        jQuery(this).val('');
        var parent = jQuery(this).parents('li:first');
        jQuery('.navbar-form', parent).animate({width: 0}, 150, function() {
            jQuery(this).hide();
            jQuery(".toggle-slide-search").show();
        });
    });
});

gXwt_lite.initComponents=function(){
	gXwt_lite.comboDropdown();
	gXwt_lite.modal();
	gXwt_lite.popover();
	gXwt_lite.textbox();
	new gXwt_lite.toaster().init();
}

/*
 * LOGIN
 */

gXwt_lite.login=function(){
	var el, compname = "login", data = "";
	var _message = {
		"info" : "xwtInfoMessageBox",
		"warning" : "xwtLoginWarningBox",
		"error" : "xwtLoginErrorBox"
	}
	this.init=function(){
		 el = jQuery('[data-xl-component="'+compname+'"]');
	     data = jQuery(el).data('xl-data');
	     data_attach_point(el, {"component": compname, "data": data});
	}
	this.showLoginMessage=function(messageType, message){
		var element = jQuery('.xwtLoginMessages');
		jQuery(element).html(message);
		jQuery(element).attr('class', 'xwtLoginMessages');
		jQuery(element).addClass(_message[messageType]);
	}
}

/*
 * ABOUT BOX
 */

gXwt_lite.about=function(){
	var el, compname = "about", data = "";

	this.init=function(){
		el = jQuery('[data-xl-component="'+compname+'"]');
	     data = jQuery(el).data('xl-data');
	     data_attach_point(el, {"component": compname, "data": data});
	}

}

/*
 * POPOVER 
 */
gXwt_lite.popover=function(){
	var self=this;
	var popoverControlsTmpl = "<div class='popover-controls'><a class='icon-help'/><a class='icon-pin'/><a class='icon-close'/></div>"
	this.init=function(){
		//bind events
		jQuery("body").on('click', '[rel=popover]',  function(e){
			var divElem = jQuery(this).attr('data-xl-content-id');
			if(!jQuery('div.'+divElem).is(':visible')){
				self.showPopOver(this);
				jQuery('div.'+divElem).parent().parent().find('.arrow').show();
			} else if(jQuery('div.'+divElem).parent().parent().find('.arrow').is(':visible')){
				jQuery(this).popover('toggle');
			}
		});
		jQuery("body").on("click", ".popover .icon-close",  function(e) {
			jQuery(e.target).parents(".popover").removeClass("in");
			jQuery(e.target).parents(".popover").remove();
			e.preventDefault();
		});
	}()
	this.showPopOver = function(elem){
		var contentId = '.'+jQuery(elem).attr('data-xl-content-id');
		jQuery(elem).popover({
	        html: true,
	        trigger: 'manual',
	        title: jQuery(elem).attr('data-xl-title'),
	        content: function () {
	        	return (popoverControlsTmpl + jQuery("#"+jQuery(elem).attr('data-xl-content-id')).html()+ '<div class='+jQuery(elem).attr("data-xl-content-id")+'></div>');
	        }
		}).popover('toggle');
		self.dragPopover(elem);
		jQuery('.icon-pin').on('click', function(){
			self.pinPopover(elem);
		});
		jQuery('.icon-close').on('click', function(){
			jQuery(contentId).parent().parent().removeClass(jQuery(elem).attr('data-xl-content-id'));
		});
	}
	this.dragPopover = function(elem){
		var isDragged = false;
		var contentId = '.'+jQuery(elem).attr('data-xl-content-id');
		jQuery('.popover').drags({handle: '.popover-title'});
		jQuery(contentId).parent().parent().find('.popover-title').on('mousedown', function(){
			isDragged = true;
		});
		jQuery(contentId).parent().parent().find('.popover-title').on('mouseup', function(){
			isDragged = false;
		});
		jQuery(contentId).parent().parent().find('.popover-title').on('mousemove', function(){
			if(isDragged == true){
				jQuery(contentId).parent().parent().find('.arrow').hide();
				self.pinPopover(elem);
			}
		});
	}
	this.pinPopover = function(elem){
		var contentId = '.'+jQuery(elem).attr('data-xl-content-id');
		jQuery(contentId).parent().parent().find('.arrow').hide();
		jQuery(contentId).parent().find('.popover-controls').find('.icon-pin').addClass('pinned');
		jQuery(contentId).parent().find('.popover-controls').addClass('popoverPinned');
	}
}

/*
 * HEADER
 */
gXwt_lite.header = function() {
    
    var el, compname = "header", data = "", $settingsMenu;
    
    this.init = function() {
    	el = jQuery('[data-xl-component="'+compname+'"]');
        data = jQuery(el).data('xl-data');
        
        data_attach_point(el, {"component": compname, "data": data});
    };
};

/*
 * GLOBAL NAVIGATION SLIDE MENU
 */

gXwt_lite.slideMenu = function() {
    var compname = "slideMenu", data = "";
    var self = this;

    this.manipulateData = function(data) {

        var menuitems = [], j = 0;
        
        // Alpha indexed menu
        jQuery.each(data.menu, function(i, menu) {
            if (typeof menu.sub_menu !== "undefined" && menu.sub_menu.length > 0) {
                var submenus = {};
                var i = 0;
                jQuery.each(menu.sub_menu, function(i, sub_menu) {
                    if (typeof sub_menu.s_m_i !== "undefined" && sub_menu.s_m_i.length > 0) {
                        jQuery.each(sub_menu.s_m_i, function(i, menuitem) {
                            menuitems[j] = menuitem;
                            j++;
                        });
                    }
                    submenus[i] = sub_menu;
                    i++;
                });
            }
        });

        var sorted = menuitems.sort(function(a, b) {
            return a.s_m_i_n.toLowerCase() > b.s_m_i_n.toLowerCase() ? 1 : -1;
        });
        var indexed = [];
        var char_counter = 0;
        var i = 0;
        var lastchar = null;
        var hasHashed = false;
        var regx = /^[A-Za-z]+$/;

        jQuery.each(sorted, function(key, menu) {
            var fchar = jQuery.trim(menu.s_m_i_n).substr(0, 1);

            if (!regx.test(fchar)) {
                fchar = '#';
                hasHashed = true;
            } else {
                fchar = fchar.toUpperCase();
            }

            if (lastchar && lastchar !== fchar) {
                char_counter++;
            }
            if (typeof indexed[char_counter] === "undefined") {
                indexed[char_counter] = {'i': fchar, 's_m_i': []};
                i = 0;
            }
            indexed[char_counter]['s_m_i'][i] = menu;
            lastchar = fchar;
            i++;
        });

        if (hasHashed) {
            indexed.push(indexed.shift());
        }
        
        data.index = indexed;
        
        // Update local var
        self.data = data;
        
        data_attach_point(el, {"component": compname, "data": data});
    };
    

    this.init = function() {
        el = jQuery('[data-xl-component="slideMenu"]');
        data = jQuery(el).data('xl-data');
        
        data_attach_point(el, {"component": compname, "data": data}, self.manipulateData);
        
        jQuery(".xwtlite").on("click", ".xwtSlideMenuMiniNavOption", function(e){
        	var selectedMenu = jQuery(this).html();
        	jQuery(".pSlideMenu .panel-body ul").each(function(item, index){
        		if(selectedMenu == jQuery(this).find("li.titleSubMenu").html()){
        			jQuery(this).find("li.titleSubMenu").next().find('a').focus();
        			return;
        		}
        	})
        });
    };
};

gXwt_lite.hideSlideMenu=function(){
	if(jQuery("#prime-slide-menu .icon-pin").hasClass("active")){
		return false;
	}
	jQuery(".toggle-slide-lr").removeClass("isOpen");
	jQuery("#prime-slide-menu").animate({
		"left" : "-"+gXwt_lite.leftoffset
	}, "fast");
	jQuery("#prime-header").animate({
		"left" : "0"
	}, "fast");
	jQuery("#prime-app-container").animate({
		"left" : "0"
	}, "fast");
	jQuery(".xwtSlideMenuIndex").hide();
}

/*
 * NOTIFICATION TOASTER 
 */


gXwt_lite.toaster=function(){
    
    var tmpl = "<div class='toasterContent'><div rel='{{rel}}' class='toaster toaster-{{type}}'><div class='alert fade in'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button><div class='toaster-message'><strong class='toaster-title'>{{title}}</strong><p class='toaster-description'>{{desc}}</p></div></div></div></div>";
    var self = this;
    
    this.init=function(){
	    jQuery(".xwtlite").on("click", ".show-toaster", function(event) {
	        event.preventDefault();
	        self.show({
	            "type": jQuery(this).data('type'),
	            "title": jQuery(this).data('title'),
	            "desc": jQuery(this).data('desc')
	        });
	    });
    }
    
    this.show = function(data) {
    	var ets= new Date().getTime();
        var _content = {
            "rel": ets,
            "type": data.type,
            "title": data.title,
            "desc": data.desc
        };
        //alert(_content['title']);
        var this_toaster = Mustache.to_html(tmpl, _content);
        jQuery("[data-xl-component='toaster']").append(this_toaster);
        var this_child_toaster = jQuery(".toaster[rel=\"" + ets + "\"]");
        jQuery(this_child_toaster).css('display', 'none');
        jQuery(this_child_toaster).slideToggle();
        setTimeout(function() {
            jQuery(this_child_toaster).fadeOut(function() {
                jQuery(this).remove();
            });
        }, 5000);
    };
}


/*
 * BREADCRUMB
 */

!function(jQuery) {
    
    "use strict"
    
    var Breadcrumb = function(element, options) {
        this.jQueryelement = jQuery(element);
        this.settings = jQuery.extend({}, jQuery.fn.breadcrumb.defaults, options);
        if(this.settings.items.length > 0) {
            this.push(this.settings.items);
        }
    };
    
    function value(argument, def) {
        return (typeof argument === 'undefined' ? def : argument);
    }
    
    function extractLabel(element) {
        var undecoratedLabel = element.firstChild.data;
        if (undecoratedLabel === undefined) {
            return element.firstChild.firstChild.data;
        }
        return undecoratedLabel;
    };
    
    function extractPath(elements) {
        var path = new Array();
        for (var i = 0; i < elements.length; i++) {
            path.push(extractLabel(elements[i]));
        }
        return path;
    }
    
    Breadcrumb.prototype.push = function(crumbs) {
        var local = this;
        var path = extractPath(this.jQueryelement.children('li[data-breadcrumb-level]'));
        jQuery.each(crumbs, function(i, crumb) {
            path.push(crumb.label);
            if(typeof crumb.destination !== "undefined") {
                local.jQueryelement.append("<li data-breadcrumb-level='" + path.length + "'><a href='"+crumb.destination+"'>" + crumb.label + "</a></li>");
            } else {
                local.jQueryelement.append("<li data-breadcrumb-level='" + path.length + "'>" + crumb.label + "</li>");
            }
        });
        this.handleEllipses(path);
        local.jQueryelement.trigger('change', [path]);
    };
    
    Breadcrumb.prototype.pop = function(iteration) {
        for (var i = 0; i < value(iteration, 1); i++) {
            var last = this.jQueryelement.children('li[data-breadcrumb-level]:last');
            last.remove();
        }
        var path = extractPath(this.jQueryelement.children('li[data-breadcrumb-level]'));
        this.handleEllipses(path);
        this.jQueryelement.trigger('change', [extractPath(this.jQueryelement.children('li'))]);
    };
    
    Breadcrumb.prototype.handleEllipses = function(path) {
        var counter = 1;
        var local = this;
        var hasExtra = path.length - this.settings.ellipses_counter > 0 ? true : false;
        var ellipses = this.jQueryelement.find('li[data-ellipses]');
        
        if(local.settings.ellipses && hasExtra) {
            if( ! jQuery(ellipses).length) {
                this.jQueryelement.find('li:eq(1)').after("<li data-ellipses='1' data-toggle='tooltip'>...</li>");
                ellipses = this.jQueryelement.find('li[data-ellipses]');
            }
        } else {
            jQuery(ellipses).tooltip('destroy');
            jQuery(ellipses).remove();
        }
        
        var tooltipArr = [];
        this.jQueryelement.children('[data-breadcrumb-level]').each(function(i, item) {
            if(local.settings.ellipses) {
                if(hasExtra && counter > 1 && counter <= path.length - 2) {
                    tooltipArr.push(jQuery(item).text());
                    jQuery(item).hide();
                } else {
                    jQuery(item).show();
                }
            } else {
                jQuery(item).show();
            }
            counter++;
        });
        
        if(tooltipArr.length > 0) {
            jQuery(ellipses).attr('data-original-title', tooltipArr.join(' / '));
            jQuery(ellipses).tooltip({placement:"auto", title: tooltipArr.join(' / ') });
        }
    };
    
    Breadcrumb.prototype.setParam = function(param, value) {
        var options = {};
        options[param] = value;
        this.settings = jQuery.extend({}, this.settings, options);
    };
    
    Breadcrumb.prototype.reset = function() {
        this.jQueryelement.children('li').remove();
        this.jQueryelement.trigger('change');
    };
    
    jQuery.fn.breadcrumb = function(options) {
        return new Breadcrumb(this, options);
    };
    
    jQuery.fn.breadcrumb.defaults = {
        ellipses: false,
        ellipses_counter: 3
    };
    
}(window.jQuery || window.ender);

/*
 * MISC
 */

gXwt_lite.goto=function(href){
	jQuery.get(href, function(_template) {
		jQuery("#prime-app-container").html(_template);
	})
	jQuery("[data-xl-rel='nav-link']").parent().removeClass('active');
	jQuery("[data-xl-rel='nav-link']").removeClass('active');
	jQuery('ul.nav > li > a[data-xl-href="' + href + '"]').parent().addClass('active');
	jQuery('.panel > .pslideMenuDrawer[data-xl-href="' + href + '"]').addClass('active');
	gXwt_lite.hideSlideMenu();
}

gXwt_lite.draggable=function(){
	jQuery.fn.drags = function(opt) {
		opt = jQuery.extend({handle:"",cursor:"move"}, opt);
		if(opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}
		return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
			if(opt.handle === "") {
				var $drag = jQuery(this).addClass('draggable');
			} else {
				var $drag = jQuery(this).addClass('active-handle').parent().addClass('draggable');
			}
			var z_idx = $drag.css('z-index'),
				drg_h = $drag.outerHeight(),
				drg_w = $drag.outerWidth(),
				pos_y = $drag.offset().top + drg_h - e.pageY,
				pos_x = $drag.offset().left + drg_w - e.pageX;			
			$drag.parents().on("mousemove", function(e) {
				jQuery('.draggable').offset({
					top:e.pageY + pos_y - drg_h,
					left:e.pageX + pos_x - drg_w
				}).on("mouseup", function() {
					jQuery(this).removeClass('draggable').css('z-index', z_idx);
				});
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function() {
			if(opt.handle === "") {
				jQuery(this).removeClass('draggable');
			} else {
				jQuery(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});
	}
}

gXwt_lite.loadNavigations = function() {
	var string = document.location.pathname;
	var hashIndex = string.lastIndexOf("/");
	var stringLen = string.length;
	var href = string.substring(hashIndex + 1, stringLen);
	/*jQuery(".toggle-slide-lr").addClass("isOpen");
	jQuery("#prime-slide-menu").css({
		"left" : "0"
	});
	jQuery("#prime-header").css({
		"left" : gXwt_lite.leftoffset
	});
	jQuery("#prime-app-container").css({
		"left" : gXwt_lite.leftoffset
	});*/
}

/*
 * TEXTBOX 
 */
gXwt_lite.textbox = function() {
	var self=this, formtype_ajax = "ajax";
        
	this.validationFormCntrl=function(){
		jQuery(".xwtlite").on("focus", "input[rel]", function(e) {
	            jQuery(this).parent('.field').find('.field-error').hide();
	        });
	        jQuery(".xwtlite").on("blur", "input[rel]", function(e) {
	            gXwt_lite.validateFormCntrl(this);    
	        });   
		// Submit handler
		jQuery(".xwtlite").on("submit", ".form-validate", function(e) {
                    var formtype = jQuery(this).data("xl-formtype");
                    var formvalid = true;
		    jQuery('input[rel]', this).each(function() {
		        formvalid = self.validateFormCntrl(this) && formvalid;
		    });
                    if(formtype === formtype_ajax) {
                        jQuery(".xwtlite").trigger("xl.form.submit", [{ el: this, valid: formvalid }]);
                        return false;
                    }
                    return formvalid;
		});
	}()
	this.validateFormCntrl=function(field){
	    var valid = true;
	    var parent = jQuery(field).parents('.field:first');
	    if( ! jQuery(field).get(0).checkValidity()) {
	        valid = false;
	        var title = jQuery(field).data('title');
	        jQuery(parent).addClass('error');
	        if(jQuery(parent).find('.field-error').length === 0) {
	            jQuery(parent).append('<span class="field-error"></span>');
	        }
	        // Show tooltip
	        if(typeof title !== "undefined" && title.length) {
	            jQuery(parent).attr('data-original-title', title);
	            jQuery(parent).tooltip({ title: title });
	        }
	    } else {
	        // Destroy tooltip
	        jQuery(parent).removeClass('error');
	        jQuery(parent).tooltip('destroy');
	    }
	    return valid;
	}
}

/*
 * PROGRESSBAR
 */
gXwt_lite.progressbar = function() {
    
    var progress;
    
    this.timerBased = function(el) {
        progress = jQuery(el);
        var jQuerybar = jQuery('.progress-bar', progress),
            jQuerypercText = jQuery('.progress-percentage', progress);
        var progressInterval = setInterval(function() {
            var valuenow = parseInt(jQuerybar.attr('aria-valuenow'));
            if (isNaN(valuenow)) {
                valuenow = 0;
            }
            if (valuenow >= 100) {
                clearInterval(progressInterval);
                jQuery(".xwtlite").trigger("xl.progressbar.complete", [{el: this}]);
            } else {
                var newvalue = valuenow + 10;
                if (newvalue > 100) {
                    newvalue = 100;
                }
                jQuerybar.css('width', newvalue + '%');
                jQuerybar.attr('aria-valuenow', newvalue);
                jQuerypercText.text(newvalue + '%');
            }
        }, 300);
    };
    
    this.decimalBased = function(el) {
        progress = jQuery(el);
        var jQuerybar = jQuery('.progress-bar', progress),
            jQuerypercText = jQuery('.progress-percentage', progress);
        var progressInterval = setInterval(function() {
            var valuenow = parseFloat(jQuerybar.attr('aria-valuenow'));
            if (isNaN(valuenow)) {
                valuenow = 0;
            }
            if (valuenow >= 100) {
                clearInterval(progressInterval);
            } else {
                var newvalue = valuenow + 0.75;
                if (newvalue > 100) {
                    newvalue = 100;
                }
                jQuerybar.css('width', newvalue + '%');
                jQuerybar.attr('aria-valuenow', newvalue);
                var rounded = (Math.round(newvalue * 10) / 10);
                var fixed = rounded.toFixed(1);
                jQuerypercText.text(fixed + '%');
            }
        }, 30);
    };
}

/*
 * COMBODROPDOWN 
 */
gXwt_lite.comboDropdown = function() {
	jQuery(".xwtlite").on("click",".dropdown-menu",function(e) {
		   e.preventDefault();
		   var selectedText = jQuery(e.target).text();
		   jQuery('input[type="text"]', jQuery(this).parents(".xwtlite .dropdown")).val(selectedText);
	});
    //@TODO - replace each with event on dropdown elements as each no more works
    
    /*
    jQuery('.xwtlite .dropdown').each(function() {
        var this_dropdown = this;
        var inputBox = jQuery('input[type="text"]', this_dropdown);
        
        var validValues = [];
        jQuery('li a', this_dropdown).each(function() {
            validValues.push(jQuery(this).text());
        });
        
        // Bind events
        jQuery('li a', this_dropdown).click(function(e) {
            e.preventDefault();
            jQuery(inputBox).val(jQuery(this).text());
        });
        
        jQuery(inputBox).blur(function() {
            validateInput(this);
        });
        
        jQuery(this_dropdown).on('hide.bs.dropdown', function () {
            validateInput(inputBox);
        });
        
        var validateInput = function(el) {
            if(jQuery.inArray(jQuery(el).val(), validValues) < 0) {
                jQuery(this_dropdown).addClass('error');
            } else {
                jQuery(this_dropdown).removeClass('error');
            }
        };
    });
    */
}
gXwt_lite.convertToIndex = function() {
}
gXwt_lite.modal=function(){
	//bind events
	jQuery("body").on("show.bs.modal", ".modal", function(e) {
		jQuery('.modal:not(.xwtAboutPage)').drags({handle: '.modal-header'});
	});
}
function data_load_template(_tmplUrl, _target, _content) {//gettting tmpl and append to el
	jQuery.get(gXwt_lite.config._basepath + gXwt_lite.config._path[_tmplUrl], function(_template) {
		var html = Mustache.to_html(_template, _content);
		jQuery(_target).html(html);
	})
}
function data_attach_point(_target, _data, _reqDataFix) {
	var _content = _data.data;
        
	switch (typeof _content) {
            case "string"://URL
                
                if (typeof window[_content] === "object") {
                        // Data in a variable
                        if(_reqDataFix) {
                            _reqDataFix(window[_content]);
                        } else {
                            data_load_template(_data.component, _target, window[_content]);
                        }
                } else {//Data in URL
                    jQuery.getJSON(_content, function(data) {
                            if(_reqDataFix) {
                                _reqDataFix(data);
                            } else {
                                data_load_template(_data.component, _target, data);
                            }
                    });
                }
                    break;
            default:
                    if(_reqDataFix) {
                        _reqDataFix(_content);
                    } else {
                        data_load_template(_data.component, _target, _content);
                    }
                    break;
	}
}
