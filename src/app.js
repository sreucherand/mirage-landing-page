import 'normalize.css'

import './grid/grid.styl'
import './app.styl'
import './intro/intro.styl'
import './section/section.styl'

import on from 'dom-event'
import select from 'dom-select'
import FastClick from 'fastclick'

import Overlay from './overlay/overlay'

class App {

    constructor () {
        let element = select('[data-component="overlay"]')

        if (element) {
            new Overlay(element)
        }
    }

}

on(document, 'DOMContentLoaded', () => {
    new App()

    FastClick.attach(document.body)
})
