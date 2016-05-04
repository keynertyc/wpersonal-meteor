import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Messages } from '/imports/api/messages.js';

import '/imports/ui/admin/messages.html';

Template.messages.helpers({
   messages () {
        return Messages.find({},{sort: {createdAt: -1}});
   },
});

Template.messages.events({
    'click .btn-removeOne' (event) {
        event.preventDefault();
        const id = this._id;
        if (confirm('Are you sure?')) {
            Meteor.call('messages.remove', id);
        }
    },
    'click .btn-remove' (event) {
        event.preventDefault();
        if (confirm('Are you sure?')) {
            const ids = $("#table-messages input:checkbox:checked").map(function () {
                return $(this).val();
            }).toArray();
            _.each(ids, (id) => {
                Meteor.call('messages.remove', id);
            });
        }
    },
    'click .btn-read' (event) {
        event.preventDefault();
        const ids = $("#table-messages input:checkbox:checked").map(function(){
            return $(this).val();
        }).toArray();
        _.each(ids, (id) => {
            Meteor.call('messages.setRead', id);
        });
    },
    'click .btn-unread' (event) {
        event.preventDefault();
        const ids = $("#table-messages input:checkbox:checked").map(function(){
            return $(this).val();
        }).toArray();
        _.each(ids, (id) => {
            Meteor.call('messages.setUnread', id);
        });
    },
    'click .check-all' () {
        $("#table-messages input:checkbox").prop('checked',true);
    },
    'click .check-none' () {
        $("#table-messages input:checkbox").prop('checked',false);
    }
})