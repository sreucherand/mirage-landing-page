import './overlay.styl'

import classes from 'dom-classes'
import select from 'dom-select'
import on from 'dom-event'

import Component from '../component/component'
import Placeholder from '../placeholder/placeholder'
import Teaser from '../teaser/teaser'

const STATUS_PLAYING = 'STATUS_PLAYING'
const STATUS_PAUSE = 'STATUS_PAUSE'

export default class Overlay extends Component {

    constructor (element) {
        super(element)

        this.status = STATUS_PAUSE

        this.controls = select('.overlay__controls', this.element)

        this.placeholder = new Placeholder(select('.overlay__placeholder', this.element))
        this.teaser = new Teaser(select('.overlay__teaser', this.element))

        on(this.controls, 'click', this.handleClick.bind(this))
        on(window, 'resize', this.handleResize.bind(this))

        this.placeholder.resize()

        this.teaser.on('stop', this.handleClick.bind(this))
        this.teaser.resize()
    }

    handleClick () {
        this.toggle()
    }

    handleResize () {
        this.placeholder.resize()
        this.teaser.resize()

        if (window.innerWidth < 1024 && this.status === STATUS_PLAYING) {
            this.pause()
        }
    }

    toggle () {
        if (this.status === STATUS_PAUSE) {
            this.play()
        } else {
            this.pause()
        }
    }

    play () {
        this.status = STATUS_PLAYING
        this.placeholder.pause()
        this.teaser.play()
        this.teaser.seek(0)

        classes.add(this.element, 'component-overlay--playing')
    }

    pause () {
        this.status = STATUS_PAUSE
        this.placeholder.play()
        this.teaser.pause()

        classes.remove(this.element, 'component-overlay--playing')
    }

}
