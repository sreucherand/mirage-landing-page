var Video = (function () {
	'use strict';

	var Video = function ($element) {

		this.$element = $element;
		this.$iframe = this.$element.find('iframe');
		this.$closeBtn = this.$element.find('.btn--close');

		this.close = this.close.bind(this);
		this.keypress = this.keypress.bind(this);
		this.stop = this.stop.bind(this);

		this.$closeBtn.on('click', this.close);

	};

	Video.prototype.open = function () {
		TweenLite.to(this.$element, 1, {x: 0, ease: Expo.easeOut});

		this.play();

		window.addEventListener('keydown', this.keypress, false);
	};

	Video.prototype.close = function () {
		var timeline = new TimelineLite();

		timeline.to(this.$element, 1, {x: '-105%', ease: Expo.easeOut, clearProps: 'all'});
		timeline.add(this.stop);
	};

	Video.prototype.play = function () {
		this.post('play');
	};

	Video.prototype.stop = function () {
		this.post('unload');
	};

	Video.prototype.keypress = function (evt) {
		if (evt.keyCode === 27) {
			this.close();

			window.removeEventListener('keydown', this.keypress, false);
		}
	};

	Video.prototype.post = function (action, value) {
        var data = {};

        data.method = action;
        
        if (value) {
            data.value = value;
        }
        
        this.$iframe[0].contentWindow.postMessage(data, '*');
    };

	return Video;
})();

module.exports = Video;
