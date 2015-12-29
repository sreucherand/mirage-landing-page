import './left-panel.scss'

import select from 'dom-select'

import Panel from '../panel/panel'

export default class LeftPanel extends Panel {

    constructor (element) {
        super(element)

        this.video = select('video', this.element)
        this.video.play()
    }

    enter () {
        return new TweenLite.to(this.element, 0.5, {opacity: 1, x: 0})
    }

}
