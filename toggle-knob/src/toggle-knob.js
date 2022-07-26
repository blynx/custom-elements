export class ToggleKnob extends HTMLElement {
    connectedCallback() {
        this.addEventListener("click", () => {
            for (let element of this.children) {
                element.toggleAttribute("hidden")
                this.toggleAttribute("open")
            }
            for (let target of document.querySelectorAll(this.dataset.target)) {
                target.classList.toggle(this.dataset.toggleClass)
            }
        })
    }

    get isOpen() {
        this.hasAttribute("open")
    }
}
