const BOUNDARY_SELECT = "[data-toggle-knob-boundary]"
const TARGET_SELECT = "[data-toggle-knob-target]"

export default class ToggleKnob extends HTMLElement {
    // prevent first toggle for attributeChangedCallback when connected
    #handleToggleAllowed = false

    static get observedAttributes() {
        return ["open"]
    }

    connectedCallback() {
        // deactivate if no data-toggle-class is given
        if (!this.dataset.toggleClass) return
        // must go through .toggle() to reflect state in "open" attribute
        this.addEventListener("click", () => {
            this.#handleToggleAllowed = true
            this.toggle()
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "open" && (typeof oldValue !== typeof newValue)) {
            this.#handleToggle()
        }
    }

    toggle() {
        this.toggleAttribute("open")
    }

    #handleToggle() {
        if (!this.#handleToggleAllowed) {
            this.#handleToggleAllowed = true
            return
        }
        requestAnimationFrame(() => {
            // switch between direct target or boundary mode
            const targets = this.dataset.target 
                ? document.querySelectorAll(this.dataset.target)
                : this.closest(BOUNDARY_SELECT)?.querySelectorAll(TARGET_SELECT)
    
            for (let element of this.children) {
                element.toggleAttribute("hidden")
            }
            for (let target of targets) {
                target.classList.toggle(this.dataset.toggleClass)
            }
            this.#dispatchToggleEvent()
        })
    }

    #dispatchToggleEvent() {
        this.dispatchEvent(new CustomEvent("toggle", {
            detail: {
                element: this,
                open: this.hasAttribute("open")
            }
        }))
    }
}
