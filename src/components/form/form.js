import './form.scss'

import classes from 'dom-classes'
import on from 'dom-event'
import select from 'dom-select'
import value from 'dom-value'
import request from 'superagent'
// import serialize from 'form-serialize'

import Component from '../component/component'

export default class Form extends Component {

    constructor (element) {
        super(element)

        this.value = ''

        this.field = select('input[type="email"]', this.element)
        this.submit = select('button[type="submit"]', this.element)

        on(this.field, 'keyup', (evt) => this.type(evt))
        on(this.element, 'submit', (evt) => this.send(evt))
    }

    type () {
        if (this.value === value(this.field)) {
            return
        }

        this.value = value(this.field)

        if (this.check()) {
            this.allow()
        } else {
            this.disable()
        }
    }

    check () {
        const reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

        return reg.test(value(this.field))
    }

    allow () {
        classes(this.element).add('form--submitable')
        this.submit.removeAttribute('disabled')
    }

    disable () {
        classes(this.element).remove('form--submitable')
        this.submit.setAttribute('disabled', true)
    }

    reset () {
        classes(this.element).remove('form--submitted')
        classes(this.element).remove('form--submitable')
        value(this.field, '')
        this.submit.setAttribute('disabled', true)
    }

    send (evt) {
        evt.preventDefault()

        if (this.check()) {
            request
                .post(window.location.href)
                .send(serialize(this.element, {hash: true}))
                .end((err, res) => {
                    classes(this.element).add('form--submitted')
                    classes(this.element).remove('form--submitable')
                })

            setTimeout(() => {
                this.reset()
            }, 3000)
        }
    }

}
