import './right-panel.scss'

import classes from 'dom-classes'
import on from 'dom-event'
import select from 'dom-select'

import Panel from '../panel/panel'

export default class RightPanel extends Panel {

    constructor (element) {
        super(element)

        this.button = select('.panel__info .btn--trailer', this.element)
        this.info = select('.panel__newsletter .newsletter__info', this.element)
        this.help = select('.panel__newsletter .link--help', this.element)

        on(this.help, 'click', (evt) => this.toggleHelp(evt))
    }

    enter () {
        let selector = Array.from(classes(this.element)).map(classname => '.' + classname).join('')
        let timeline = new TimelineLite({paused: true})

        timeline.staggerTo(select.all(selector + ' > *', this.element), 0.75, {opacity: 1}, 0.1)

        return timeline
    }

    toggleHelp (evt) {
        evt.preventDefault()

        let classBase = 'newsletter__info--opened'
        let index = Number(classes.has(this.info, classBase))
        let prefix = ['+=', '-=']

        let className = prefix[index].concat(classBase)

        TweenLite.to(this.info, 0.5, {className: className})
    }

}
