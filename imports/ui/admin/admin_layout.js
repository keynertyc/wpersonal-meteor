import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/admin/admin_layout.html';
import '/imports/ui/admin/admin_navbar.html';
import '/imports/ui/admin/message.html';

import '/imports/ui/admin/messages.js';

Template.registerHelper('formatDate', (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('profile_name', () => {
    return Meteor.user().profile.name;
});

Template.admin_navbar.events({
    'click .user-logout' () {
        Meteor.logout((err) => {
            if (err) {
                FlashMessages.sendError(err.reason);
            } else {
                Router.go('/');
    }
    });
    }
});

Template.body.onCreated( () => {
   Meteor.subscribe('messages.public');
});