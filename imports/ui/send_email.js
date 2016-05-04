import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Messages } from '/imports/api/messages.js';

import '/imports/ui/send_email.html';

Template.send_email.onRendered( () => {
    $("#send-email").validate({
        errorClass: "help-error",
        errorElement: "span",
        highlight (element) {
            //$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight (element) {
            $(element).closest('.form-group').removeClass('has-error');
            //$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: TAPi18n.__("name_validation")
            },
            email: {
                required: TAPi18n.__("email_validation"),
                email: TAPi18n.__("email_validation2")
            },
            subject: {
                required: TAPi18n.__("subject_validation")
            },
            message: {
                required: TAPi18n.__("message_validation")
            }
        },
        submitHandler() {
            let name = $("[name='name']").val();
            let to = $("[name='email']").val();
            let subject = $("[name='subject']").val();
            let message = $("[name='message']").val();

            Meteor.call('messages.insert', name, to, subject, message );
            Meteor.call('messages.sendEmail', name, to, subject, message );

            $("[name='name']").val('');
            $("[name='email']").val('');
            $("[name='subject']").val('');
            $("[name='message']").val('');

            toastr.success(TAPi18n.__("success_sendemail"), TAPi18n.__("thanks"));
        }
    });
});

Template.send_email.events({

    'submit .send-email' (event) {
        event.preventDefault();
        //let name = event.target.name.value;
        //let to = event.target.email.value;
        //let subject = event.target.subject.value;
        //let message = event.target.message.value;
        //
        //Meteor.call('messages.insert', name, to, subject, message );
        //Meteor.call('messages.sendEmail', name, to, subject, message );
        //
        //event.target.name.value = '';
        //event.target.email.value = '';
        //event.target.subject.value = '';
        //event.target.message.value = '';
        //
        //toastr.success(TAPi18n.__("success_sendemail"), TAPi18n.__("thanks"));

    }

})