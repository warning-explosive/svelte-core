class Modal {
    modalIsShown = false;

    open() {
        const body = this.getBody();

        if (body) {
            this.modalIsShown = true;
            body.style.overflow = 'hidden';
        }
    };

    close() {
        const body = this.getBody();

        if (body) {
            this.modalIsShown = false;
            body.style.overflow = 'auto';
        }
    };

    private getBody(): ElementCSSInlineStyle | null {
        return document.querySelector('body');
    }
}

export default Modal;