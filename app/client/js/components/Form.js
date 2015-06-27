var $ = require('jquery');

var Form = (function () {
	'use strict';

	var Form = function ($element) {

		this.type = this.type.bind(this);
		this.submit = this.submit.bind(this);

		this.$element = $element;
		this.$field = this.$element.find('input[type="email"]');
		this.$submit = this.$element.find('button[type="submit"]');

		this.$field.on('input', this.type);
		this.$element.on('submit', this.submit);

	};

	Form.prototype.type = function () {
		if (this.check()) {
			this.allow();
		} else {
			this.disable();
		}
	};

	Form.prototype.check = function (evt) {
		var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

		return reg.test(this.$field.val());
	};

	Form.prototype.allow = function () {
		this.$element.addClass('form--submitable');
		this.$submit.prop('disabled', false);
	};

	Form.prototype.disable = function () {
		this.$element.removeClass('form--submitable');
		this.$submit.prop('disabled', true);
	};

	Form.prototype.reset = function () {
		this.$element.removeClass('form--submitable form--submitted');
		this.$field.val('');
		this.$submit.prop('disabled', true);
	};

	Form.prototype.submit = function (evt) {
		evt.preventDefault();

		if (this.check()) {
			$.post(window.location.href, this.$element.serialize(), function () {
				this.$element.addClass('form--submitted').removeClass('form--submitable');
			}.bind(this));

			setTimeout(this.reset.bind(this), 3000);
		}
	};

	return Form;

})();

module.exports = Form;
