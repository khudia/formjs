/*
Mail script to send form data. Support file sending
Homepage: 
Version: 0.2;
Dependecies : jQuery
Author: Georgy Khudiakov
Mail: me@regesh.ru
*/
var formjs = {
    config: {
        debug: 0,
        form: null,
        formData: null,
        url: null,
        submit: '#submit',
        info: '#forminfo',
        infotext: 'Form sent. Thanks!',
        infotextdelay: 2000,
        loadingtext: 'Form is sending. Please wait',
        filetext: "Select file",
        filename: 'fileholder',
        filestart: '<button type="button" class="btn fileholder">',
        fileend: '</button>',
        result: null
    },
    beforeSend: function() {},
    afterSend: function() {},
    errorSend: function() {},
    successSend: function() {},
    debug: function(data) {
        if (typeof data == 'undefined') {
            data = this.config;
        }
        console.log("=======THIS IS DEBUG MODE========");
        console.log(data);
        console.log("=======THIS IS DEBUG MODE========");
    },
    loadOptions: function(data) {
        for (key in data) {
            val = data[key];
            this.config[key] = data[key];
            if (key == 'name' && key !== this.config.filename) {
                this.config.filestart = '<button type="button" class="btn ' + this.config.filename + '">'
            }
        }
    },
    init: function(form, options) {
        if (typeof options === 'object') {
            this.loadOptions(options);
        }
        app = this;
        app.config.form = $(form);
        app.config.url = $(form).attr('action');
        app.setSubmit();
        app.setFileButtons();
        $(app.config.form).submit(function(e) {
            app.config.formData = new FormData(app.config.form[0]);
            e.preventDefault();
            app.sendForm();
        });
    },
    setFileButtons: function() {
        var app = this;
        var files = app.config.form.find('input[type=file]');
        if (files.length > 0) {
            files.each(function(index, item) {
                if ($(item).hasClass('hidden')) {
                    var container = app.config.filestart + app.config.filetext + app.config.fileend;
                    $(item).hide();
                    $(item).after(container);
                }
            });
        }
        $(app.config.form).on("click", '.' + app.config.filename, function() {
            var button = this
            var fileinput = $(this).prev('input[type=file]');
            fileinput.trigger('click');
            fileinput.on('change', function() {
                var fileName = $(this).val().split('/').pop().split('\\').pop();
                $(button).text(fileName);
            })
        });
    },
    setSubmit: function() {
        app = this;
        submit = app.config.form.find(':submit');
        if (submit.is(':hidden')) {
            submitCustom = app.config.form.find(app.config.submit);
            submitCustom.click(function() {
                submit.trigger("click");
            })
        }
    },
    sendForm: function() {
        app = this;
        debug = app.config.debug;
        $(app.config.info).text(app.config.loadingtext);
        if (debug == 1) {
            console.log(app.config.formData);
        }
        app.beforeSend();
        $.ajax({
            url: app.config.url,
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            data: app.config.formData,
            success: function(result) {
                app.config.form.trigger('reset');
                $('.' + app.config.filename).text(app.config.filetext);
                app.animateStatus();
                app.successSend();
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            var error = jqXHR.status + ' ' + jqXHR.statusText;
            console.log(jqXHR);
            $(app.config.info).text(error);
            app.errorSend();
        }).done(function(result) {
            if (debug == 1) {
                console.log(result);
            }
            app.config.result = result;
            app.afterSend();
        });
    },
    animateStatus: function() {
        app = this;
        $(app.config.info).text(app.config.infotext);
        setTimeout(function() {
            $(app.config.info).text('');
        }, app.config.infotextdelay);
    }
};
