odoo.define('anz_wapp.fields', function (require) {
"use strict";

var basic_fields = require('web.basic_fields');
var core = require('web.core');
var session = require('web.session');

var _t = core._t;

/**
 * Override of FieldPhone to add a button calling SMS composer if option activated (default)
 */

var Phone = basic_fields.FieldPhone;
Phone.include({
    /**
     * By default, enable_sms is activated
     *
     * @override
     */
    init() {
        this._super.apply(this, arguments);
        this.enableWAPP = 'enable_wapp' in this.attrs.options ? this.attrs.options.enable_wapp : true;
        // reinject in nodeOptions (and thus in this.attrs) to signal the property
        this.attrs.options.enable_wapp = this.enableWAPP;
    },
    /**
     * When the send SMS button is displayed, $el becomes a div wrapping
     * the original links.
     * This method makes sure we always focus the phone number
     *
     * @override
     */
    getFocusableElement() {

        if (this.enableWAPP && this.mode === 'readonly') {
            return this.$el.filter('.' + this.className);
        }

        return this._super.apply(this, arguments);
    },
    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Open SMS composer wizard
     *
     * @private
     */
    _onClickWAPP: function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(ev.currentTarget.href);
    },

    /**
     * Add a button to call the composer wizard
     *
     * @override
     * @private
     */
    _renderReadonly: function () {
        var def = this._super.apply(this, arguments);

        if (this.enableWAPP && this.value) {
            var phone = this.value.match(/\d+/g).join('');
            var urlWAPP = 'https://wa.me/' + phone;

            var $composerButton = $('<a>', {
                title: _t('Contact by WhatsApp'),
                href: urlWAPP,
                target: '_blank',
                class: 'ml-3 d-inline-flex align-items-center o_field_phone_sms',
                html: $('<small>', {class: 'font-weight-bold ml-1', html: 'WAPP'})
            });
            $composerButton.prepend($('<i>', {class: 'fa fa-whatsapp'}));
            $composerButton.on('click', this._onClickWAPP.bind(this));
            this.$el = this.$el.add($composerButton);
        }
        return def;
    },
});

return Phone;

});
