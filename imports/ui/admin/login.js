import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/admin/login.html';

Template.login.events({
    'submit .form-login' (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                FlashMessages.sendError(err.reason);
                event.target.password.value = '';
            } else {
                Router.go('/admin/messages');
            }
        });
    }
});