import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/i18n/en.i18n.json';
import '/imports/i18n/es.i18n.json';

import '/imports/ui/default_layout.html';
import '/imports/ui/home.html';
import '/imports/ui/navbar.html';

import '/imports/ui/send_email.js';
import '/imports/ui/admin/login.js';


Template.navbar.events({
    'click .change-language' () {
        if (TAPi18n.getLanguage() === 'en') {
            TAPi18n.setLanguage('es');
        } else {
            TAPi18n.setLanguage('en');
        }
    }
});


Template.registerHelper('defaultLanguage', () => {
    const language = TAPi18n.getLanguage();
    if (language === 'en') {
        return true;
    }else {
        return false;
    }
});