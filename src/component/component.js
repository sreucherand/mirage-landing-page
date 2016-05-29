import select from 'dom-select'

import EventEmitter from '../event-emitter/event-emitter'

export default class Component extends EventEmitter {

    constructor (element) {
        super()
        
        this.element = element
    }

    getManifest () {
        return Array.from(select.all('img', this.element)).map(image => image.getAttribute('src')) || []
    }

}
