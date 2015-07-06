var Promise = require('bluebird');
var $ = require('jquery');
var FastClick = require('fastclick');

var Form = require('./components/Form');
var Video = require('./components/Video');

var App = (function () {
	'use strict';

	var App = function () {

		this.$element = $('.wrapper');
		this.$leftPanel = this.$element.find('.wrapper__panel--left');
		this.$rightPanel = this.$element.find('.wrapper__panel--right');
		this.$help = this.$rightPanel.find('.panel__newsletter .link--help');
		this.$info = this.$rightPanel.find('.panel__newsletter .newsletter__info');
		this.$trailer = this.$rightPanel.find('.panel__info .btn--trailer');
		this.$loader = this.$element.find('.wrapper__load-layer');
		this.$progress = this.$loader.find('.load__progress');
		this.$video = this.$leftPanel.find('video');

		this.toggleHelp = this.toggleHelp.bind(this);
		this.trailer = this.trailer.bind(this);

		this.$help.on('click', this.toggleHelp);
		this.$trailer.on('click', this.trailer);

		new Form(this.$element.find('.panel__newsletter form'));

		this.trailer = new Video(this.$element.find('.wrapper__video-layer'));

	};

	App.prototype.load = function () {
		var manifest = ['/public/assets/img/logo--mirage.gif'];
		var promises = [];

		for (var i=0; i<manifest.length; i++) {
			promises.push(new Promise(function (resolve, reject) {
				var img = new Image();

				img.onload = function () {
					resolve();
				};
				img.src = manifest[i];
			}));
		}

		if (window.innerWidth >= 1024) {
			promises.push(new Promise(function (resolve, reject) {
                if (this.$video[0].readyState > 3) {
                  resolve();
                } else {
                    this.$video[0].addEventListener('loadstart', function () {
                        resolve();
                    });
                }
			}.bind(this)));
			this.$video[0].load();
		}

		Promise.all(promises).then(function () {
			var timeline = new TimelineLite();

			timeline.to(this.$progress, 1, {x: 0, ease: Expo.easeOut});
			timeline.add(function () {
				this.$loader.remove();
			}.bind(this));

			timeline.to(this.$leftPanel, 0.5, {opacity: 1, x: 0, ease: Expo.easeOut}, 'display');
			timeline.staggerTo(this.$rightPanel.find('> *'), 0.75, {opacity: 1, ease: Expo.easeOut}, 0.1, 'display+=0.2');

			this.$video[0].play();
		}.bind(this));
	};

	App.prototype.toggleHelp = function (evt) {
		evt.preventDefault();

        var classBase = 'newsletter__info--opened';
        var index = Number(this.$info.hasClass(classBase));
        var prefix = ['+=', '-='];

        var className = prefix[index].concat(classBase);

		TweenLite.to(this.$info, 0.5, {className: className, ease: Expo.easeOut});
	};

	App.prototype.trailer = function (evt) {
		evt.preventDefault();

		this.trailer.open();
	};

	return App;

})();

window.onload = function () {
	var app = new App();

	app.load();

	FastClick.attach(document.body);
};
