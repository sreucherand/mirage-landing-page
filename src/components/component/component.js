import select from 'dom-select'

export default class Component {

    constructor (element) {
        this.element = element
    }

    getManifest () {
        return Array.from(select.all('img', this.element)).map(image => image.getAttribute('src')) || []
    }

}
