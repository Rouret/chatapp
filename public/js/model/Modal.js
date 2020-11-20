export default class Modal {
    static idModal
    static idTextModal
    static idCloseModal

    static open(text) {
        Modal.setContentText(text)
        Modal.getModalElement().css("display", "block")
    }
    static close() {
        Modal.getModalElement().css("display", "none")
    }
    static setContentText(text) {
        $(`#${Modal.idTextModal}`).html(text == undefined ? "Oula petite erreur rafraîchie la page" : text)
    }
    static loadEvent() {
        $(document).click((event) => {
            if (event.target == Modal.getModalElement()) Modal.close;
        })
        $(`#${Modal.idCloseModal}`).click(() => {
            Modal.close();
        })
    }
    static getModalElement() {
        return $("#" + Modal.idModal);
    }
    static init(idModal, idTextModal, idCloseModal) {
        Modal.setIdModal(idModal)
        Modal.setidTextModal(idTextModal)
        Modal.setIdCloseModal(idCloseModal)

        Modal.loadEvent()
    }
    static setIdModal(id) {
        this.idModal = id
    }
    static setidTextModal(id) {
        this.idTextModal = id
    }
    static setIdCloseModal(id) {
        this.idCloseModal = id
    }

}