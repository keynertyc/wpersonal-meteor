import { Messages } from '/imports/api/messages.js';

Router.configure({
    layoutTemplate: 'default_layout'
});

Router.map( function () {
    this.route('home', {
        path: '/',
        template: 'home'
    });
    this.route('login', {
        path: '/admin',
        template: 'login',
        onBeforeAction () {
            if (Meteor.user() !== null) {
                Router.go('/admin/messages');
            }
            this.next();
        }
    });
    this.route('messages', {
        path: '/admin/messages',
        template: 'messages',
        layoutTemplate: 'admin_layout',
        onBeforeAction () {
            if (Meteor.user() === null) {
                Router.go('/');
            }
            this.next();
        }
    });
    this.route('message', {
        path: '/admin/message/:_id',
        template: 'message',
        layoutTemplate: 'admin_layout',
        onBeforeAction () {
            if (Meteor.user() === null) {
                Router.go('/');
            }
            var currentMessage = this.params._id;
            Meteor.call('messages.setRead', currentMessage);
            this.next();
        },
        data () {
            var currentMessage = this.params._id;
            return Messages.findOne(currentMessage);
        }
    });
});