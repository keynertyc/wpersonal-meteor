import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
    'messages.insert' (name, to, subject, message) {
        check([name, to, subject, message], [String]);

        Messages.insert({
            from: to,
            name: name,
            to: process.env.MAIL_FROM,
            subject: subject,
            message: message,
            createdAt: new Date(),
            read: false
        });
    },
    'messages.sendEmail' (name, to, subject, message) {
        check([name, to, subject, message], [String]);

        this.unblock();

        Email.send({
            to: to,
            from: process.env.MAIL_FROM,
            subject: subject,
            text: message
        });
    },
    'messages.setRead' (id) {
        check(id, String);

        Messages.update(id, {
            $set: {
                read: true,
                updatedAt: new Date()
            }
        });
    },
    'messages.setUnread' (id) {
        check(id, String);

        Messages.update(id, {
            $set: {
                read: false,
                updatedAt: new Date()
            }
        });
    },
    'messages.remove' (id) {
        check(id, String);

        Messages.remove(id);
    }
});

if (Meteor.isServer) {
    Meteor.publish('messages.public', () => {
        return Messages.find();
    });
}