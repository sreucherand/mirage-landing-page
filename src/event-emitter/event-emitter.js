export default class EventEmitter {

    constructor () {
        this._handlers = {}
    }

    on (name, fn) {
        if (typeof name === 'string' && typeof fn === 'function') {
            this._handlers[name] = (this._handlers[name] || []).concat(fn)
        }
    }

    once (name, fn) {
        if (typeof fn === 'function') {
            fn.__once = true
            this.on.call(this, name, fn)
        }
    }

    off (name, fn) {
        if (typeof name === 'string') {
            this._handlers[name] = (this._handlers[name] || [])

            if (typeof fn === 'function') {
                this._handlers[name].filter(handler => handler !== fn)
            } else if (typeof fn === 'undefined') {
                this._handlers[name].length = 0
            }
        }

        if (arguments.length === 0) {
            this._handlers = {}
        }
    }

    dispatch (name, ...parameters) {
        if (typeof name === 'string') {
            let handlers = this._handlers[name] || []

            for (let handler of handlers) {
                handler.apply(this, parameters)

                if (handler.__once === true) {
                    this.off(name, handler)
                }
            }
        }
    }

}
