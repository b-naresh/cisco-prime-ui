var xwtAboutData = {
    "applicationName": "Cisco Prime UI",
    "applicationSubtitle": "Prime - UX Standards",
    "versionNumber": "1.0 Lite",
    "additionalInfo": {
        "items": [{
                "key": "Licence Type",
                "value": "Evaluation"
            }, {
                "key": "Device Count",
                "value": "100"
            }, {
                "key": "Install Date/Updated On",
                "value": "28 Jun 2010"
            }, {
                "key": "Expiry Date",
                "value": "28 Jun 2018"
            }]
    },
    "optionalLinks": {
        "items": [{
                "label": "More Info",
                "href": "http://www.cisco.com",
                "target": "_newWindow"
            }]
    },
    "bottomLinks": {
        "items": [{
                "label": "Check for Updates",
                "href": "http://www.cisco.com",
                "target": "_newWindow"
            }, {
                "label": "Provide Feedback",
                "href": "http://www.cisco.com",
                "target": "_newWindow"
            }]
    },
    "copyrightInfo": "@ 2014 Cisco Systems, Inc. Cisco, Cisco Systems and Cisco Systems logo are registered trademarks of Cisco Systems, Inc. and/or its affiliates in the U.S. and certain other countries"
};

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
            "href": "../../docs/xwt-lite-reference-guide.pdf",
            "target": "_blank"
        }, {
            "label": "About",
            "href": "#",
            "onclick": "showAboutModal(); return false"
        }, {
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
        }]
};

var xwtHeaderData = {
    ciscoPrime: true,
    applicationTitle: "Cisco Prime Device Configuration",
    headerLogoURL: "http://prime-ui.cisco.com",
    headerAppNameURL: "http://prime-ui.cisco.com",
    requireSearch: true,
    requireSettingsMenu: true,
    requireNotifications: true,
    notificationItems: "notificationItems", // not used
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
    new gXwt_lite.about().init();
    
    // Goto page
    gXwt_lite.goto("home.html");
});
