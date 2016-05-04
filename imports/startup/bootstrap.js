import { Meteor } from 'meteor/meteor';

import '/imports/i18n/en.i18n.json';
import '/imports/i18n/es.i18n.json';

Meteor.startup( () => {
    process.env.MAIL_URL = "smtp://55250341c5357ffd9:51e9a247cf5b7d@mailtrap.io:2525/";
    process.env.MAIL_FROM = "me@keynertyc.com";

    if (Meteor.users.find().count() === 0 ) {
        const users = [{
            email: 'keyner.peru@gmail.com',
            name: "Keyner TYC"
        }];

        _.each(users, (user) => {
            Accounts.createUser({
                email: user.email,
                password: '798df98df7f',
                profile: {
                    name: user.name
                }
            });
        });
    }

    if (Meteor.isClient) {
        TAPi18n.setLanguage('en');
    }

});