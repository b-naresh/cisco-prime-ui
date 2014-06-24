var menuItems = {
    "items": [{
        "label": "Logged in as admin",
        "header": true
    }, {
        "label": "Log out",
        "href": "#"
    }, {
        "divider": true
    }, {
        "label": "Help",
        "header": true
    }, {
        "label": "Help Content",
        "href": "../docs/xwt-lite-reference-guide.pdf",
        "target": "_blank"
    }, {
        "label": "About",
        "href": "#",
        "onclick": "showAboutModal(); return false"
    }/*, {
        "label": "Theme: <b>Developer</b>",
        "href": "#",
        "sub_menu": {
            "items": [{
                "label": "Life Cycle",
                "href": "#"
            }, {
                "label": "Developer",
                "href": "#"
            }]
        }
    }*/]
};

var xwtHeaderData = {
    ciscoPrime: true,
    applicationTitle: "XWT - Lite Explorer",
    headerLogoURL: "http://prime-ui.cisco.com",
    headerAppNameURL: "http://prime-ui.cisco.com",
    requireSearch: true,
    requireSettingsMenu: true,
    requireNotifications: true,
    notificationItems: "notificationItems",     // not used
    menuItems: menuItems,
    searchItems: "searchItems"                  // not used
};

function showAboutModal() {
    jQuery('#xwt-About').modal('show');
    return false;
}

jQuery(function() {
    // Components init
    new gXwt_lite.header().init();
    new gXwt_lite.slideMenu().init();
    
    // Goto page
    gXwt_lite.goto("test_home.html");
});
