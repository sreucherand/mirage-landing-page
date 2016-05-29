import on from 'dom-event'
import select from 'dom-select'
import raf from 'raf'

import Component from '../component/component'

export default class Placeholder extends Component {

    constructor (element) {
        super(element)

        this.video = select('video', this.element)

        this.canvas = select('canvas', this.element)
        this.context = this.canvas.getContext('2d')

        this.ratio = 0

        on(this.video, 'play', this.handlePlay.bind(this))
        on(this.video, 'pause', this.handlePause.bind(this))

        this.draw()
    }

    handlePlay () {
        this.draw()
    }

    handlePause () {
        if (this.frame) {
            raf.cancel(this.frame)
        }
    }

    play () {
        this.video.play()
    }

    pause () {
        this.video.pause()
    }

    draw () {
        this.context.drawImage(this.video, (1920 - 430 / this.ratio) / 2, 0, 430 / this.ratio, 430, 0, 0, this.canvas.width, this.canvas.height)

        this.frame = raf(this.draw.bind(this))
    }

    resize () {
        const { innerWidth, innerHeight } = window

        this.canvas.width = innerWidth
        this.canvas.height = innerHeight

        this.ratio = innerHeight / innerWidth
    }

}
