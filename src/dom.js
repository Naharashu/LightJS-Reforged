// development
export class ElementCollection extends Array {
    onready(cb) {
        const isReady = this.some(e => {
            return e.readyState != null && e.readyState !== 'loading';
        });
        if (isReady) {
            cb();
        }
        else {
            this.on('DOMContentLoaded', "html", cb);
        }
        return this;
    }
    html(result) {
        try {
            this.forEach(e => {
                e.innerHTML = result;
            });
        }
        catch {
            console.error("Error in DOM.html()");
        }
        return this;
    }
    text(result) {
        try {
            this.forEach(e => {
                e.textContent = result;
            });
        }
        catch {
            console.error("Error in DOM.text()");
        }
        return this;
    }
    value() {
        const firstElement = this[0];
        return firstElement && 'value' in firstElement ? firstElement.value : '';
    }
    setValue(value) {
        if (arguments.length > 0) {
            this.forEach(e => {
                e.value = value;
            });
            return this;
        }
        else {
            console.error("Error in DOM.setValue()");
        }
    }
    on(event, cborSelector, cb) {
        if (typeof cborSelector === 'function') {
            this.forEach(e => {
                e.addEventListener(event, cborSelector);
            });
        }
        else {
            this.forEach(elem => {
                elem.addEventListener(event, (e) => {
                    if (e.target.matches(cborSelector)) {
                        cb(e);
                    }
                });
            });
        }
        return this;
    }
    click(cb) {
        this.forEach(elem => {
            elem.addEventListener('click', cb);
        });
        return this;
    }
    hover(Selector, cb) {
        this.forEach(elem => {
            elem.addEventListener('hover', (e) => {
                if (e.target.matches(Selector)) {
                    cb(e);
                }
            });
        });
        return this;
    }
    next() {
        return this.map(e => e.nextElementSibling).filter(e => e !== null);
    }
    prev() {
        return this.map(e => e.previousElementSibling).filter(e => e !== null);
    }
    removeClass(className) {
        this.forEach(e => {
            e.classList.remove(className);
        });
        return this;
    }
    addClass(className) {
        this.forEach(e => {
            e.classList.add(className);
        });
        return this;
    }
    hasClass(className) {
        return this.some(e => {
            return e.classList.contains(className);
        });
    }
    toggleClass(className) {
        this.forEach(e => {
            e.classList.toggle(className);
        });
        return this;
    }
    css(property, value) {
        const camelProperty = property.replace(/-([a-z])/g, (g) => g.replace('-', '').toUpperCase());
        this.forEach(e => e.style[camelProperty] = value);
        return this;
    }
    hide(element) {
        this.forEach(e => {
            e.style.display = 'none';
        });
        return this;
    }
    show(element) {
        this.forEach(e => {
            e.style.display = 'block';
        });
        return this;
    }
    dark(element) {
        this.forEach(e => {
            e.style.backgroundColor = 'black';
            e.style.color = 'white';
        });
        return this;
    }
    white(element) {
        this.forEach(e => {
            e.style.backgroundColor = 'white';
            e.style.color = 'black';
        });
        return this;
    }
    append(element) {
        this.forEach(e => {
            if (element instanceof ElementCollection) {
                element.forEach(el => e.appendChild(el));
            }
            else if (typeof element === 'string') {
                const temp = document.createElement('template');
                temp.innerHTML = element.trim();
                temp.content.childNodes.forEach(node => {
                    e.appendChild(node.cloneNode(true));
                });
            }
            else if (element instanceof Node) {
                e.appendChild(element);
            }
        });
        return this;
    }
    remove(element) {
        this.forEach(e => {
            e.removeChild(element);
        });
        return this;
    }
    replace(newEL, old) {
        this.forEach(e => {
            e.replaceChild(newEL, old);
        });
        return this;
    }
}
export class Dom {
    constructor() {
    }
    $(element) {
        if (element == null)
            return null;
        if (typeof element === 'string') {
            return new ElementCollection(document.querySelector(element));
        }
        else {
            return new ElementCollection(element);
        }
    }
    $A(element) {
        if (!element)
            return;
        if (typeof element === 'string') {
            return new ElementCollection(...document.querySelectorAll(element));
        }
        else {
            return new ElementCollection(...element);
        }
    }
    $C(element, value) {
        let el = document.createElement(element);
        el.textContent = value;
        return el;
    }
    $D(element) {
        let el = document.querySelector(`[name="${element}"]`);
        if (el) {
            el.remove();
        }
        return el;
    }
}
