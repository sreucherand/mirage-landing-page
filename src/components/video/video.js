import './video.scss'

import on from 'dom-event'
import {off} from 'dom-event'
import select from 'dom-select'

import Component from '../component/component'

export default class Video extends Component {

    constructor (element) {
        super(element)

        this.closeBtn = select('.btn--close', this.element)
        this.iframe = select('iframe', this.element)

        this.keypress = this.keypress.bind(this)

        on(this.closeBtn, 'click', (evt) => this.close(evt))
    }

    open () {
        TweenLite.to(this.element, 1, {x: '0%'})

        this.play()

        on(window, 'keydown', this.keypress, false)
    }

    close () {
        let timeline = new TimelineLite()

        timeline.to(this.element, 1, {x: '-105%'})
        timeline.add(() => this.stop())
    }

    play () {
        this.post('play')
    }

    stop () {
        this.post('unload')
    }

    keypress (evt) {
        if (evt.keyCode === 27) {
            this.close()

            off(window, 'keydown', this.keypress, false)
        }
    }

    post (action, value) {
        let data = {}

        data.method = action
        
        if (value) {
            data.value = value
        }
        
        this.iframe.contentWindow.postMessage(data, '*')
    }

}
