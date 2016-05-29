import './plyr.scss'

import on from 'dom-event'
import plyr from 'plyr'

import Component from '../component/component'

export default class Teaser extends Component {

    constructor (element) {
        super(element)

        this.player = plyr.setup(this.element, { controls: ['play', 'progress', 'mute', 'captions', 'fullscreen'] })[0]

        on(this.player.media, 'ended', this.handleStop.bind(this))

        fetch('https://cdn.plyr.io/1.6.11/plyr.svg')
            .then(response => response.text())
            .catch(e => console.error(e))
            .then((svg) => {
                const element = document.createElement('div')
                element.style.display = 'none'
                element.innerHTML = svg
                this.element.appendChild(element)
            })
    }

    handleStop () {
        this.dispatch('stop')
    }

    play () {
        this.player.play()
    }

    pause () {
        this.player.pause()
    }

    seek () {
        this.player.seek(0)
    }

    resize () {
        this.element.style.width = `${innerWidth}px`
        this.element.style.height = `${innerHeight}px`
    }

}
