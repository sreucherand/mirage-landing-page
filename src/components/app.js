import 'normalize.scss/normalize.scss'
import 'flexboxgrid/dist/flexboxgrid.css'

import '../scss/common.scss'
import '../scss/base/_fonts.scss'
import '../scss/utils/_text.scss'

import './button/button.scss'
import './link/link.scss'

import 'TweenLite'
import 'TimelineLite'
import 'CSSPlugin'
import 'EasePack'

import select from 'dom-select'
import on from 'dom-event'
import FastClick from 'fastclick'
import Promise from 'Bluebird'

import Form from './form/form'
import Loader from './loader/loader'
import LeftPanel from './left-panel/left-panel'
import RightPanel from './right-panel/right-panel'
import Video from './video/video'

// class App {

//     constructor () {
//         TweenLite.defaultEase = Expo.easeOut

//         this.container = select('.wrapper')
//         this.components = []

//         this.form = new Form(select('.panel__newsletter form', this.container))
//         this.leftPanel = new LeftPanel(select('.wrapper__panel--left', this.container))
//         this.rightPanel = new RightPanel(select('.wrapper__panel--right', this.container))
//         this.loader = new Loader(select('.wrapper__load-layer', this.container))
//         this.video = new Video(select('.wrapper__video-layer', this.container))

//         this.components.push(this.form)
//         this.components.push(this.leftPanel)
//         this.components.push(this.rightPanel)
//         this.components.push(this.loader)
//         this.components.push(this.video)

//         on(this.rightPanel.button, 'click', (evt) => this.video.open(evt))

//         this.load().then(() => this.init())
//     }

//     load () {
//         let manifest = []
//         let promises = []

//         this.components.forEach(component => {
//             manifest = manifest.concat(component.getManifest())
//         })

//         manifest.forEach(src => {
//             promises.push(new Promise((resolve, reject) => {
//                 let image = new Image()
//                 image.onload = resolve
//                 image.src = src
//             }))
//         })

//         return Promise.all(promises)
//     }

//     init () {
//         let timeline = new TimelineLite({paused: true})

//         timeline.add(this.loader.complete().play())
//         timeline.add([this.leftPanel.enter(), this.rightPanel.enter().play()], '+=0', 'normal', 0.2)
//         timeline.play()
//     }

// }

// window.onload = function () {
//     new App()

//     FastClick.attach(document.body)
// }
