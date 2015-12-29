import './loader.scss'

import remove from 'dom-remove'
import select from 'dom-select'

import Component from '../component/component'

export default class Loader extends Component {
    
    constructor (element) {
        super(element)

        this.progress = select('.load__progress', this.element)
    }

    complete () {
        let timeline = new TimelineLite({paused: true})

        timeline.to(this.progress, 1, {x: 0})
        timeline.add(() => {
            remove(this.element)
        })

        return timeline
    }

}
