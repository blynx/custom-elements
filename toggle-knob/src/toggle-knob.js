const BOUNDARY_SELECT = "[data-toggle-knob-boundary]"
const TARGET_SELECT = "[data-toggle-knob-target]"

export default class ToggleKnob extends HTMLElement {
    connectedCallback() {
        // deactivate if no data-toggle-class is given
        if (!this.dataset.toggleClass) return
        // switch between direct target or boundary mode
        const targets = this.dataset.target 
            ? document.querySelectorAll(this.dataset.target)
            : this.closest(BOUNDARY_SELECT).querySelectorAll(TARGET_SELECT)

        this.addEventListener("click", () => {
            requestAnimationFrame(() => {
                for (let element of this.children) {
                    element.toggleAttribute("hidden")
                }
                for (let target of targets) {
                    target.classList.toggle(this.dataset.toggleClass)
                }
            })
        })
    }
}
