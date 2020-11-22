export default class Modal {
    static idModal
    static idCloseModal

    static open() {
        Modal.getModalElement().css("display", "block")
    }
    static close() {
        Modal.getModalElement().css("display", "none")
    }
    static loadEvent() {
        $(document).click((event) => {
            if ($(event.target)[0].id === Modal.getModalElement()[0].id) Modal.close();
        })
        $(`#${Modal.idCloseModal}`).click(() => {
            Modal.close();
        })
    }
    static getModalElement() {
        return $("#" + Modal.idModal);
    }
    static init(idModal, idCloseModal) {
        Modal.setIdModal(idModal)
        Modal.setIdCloseModal(idCloseModal)

        Modal.loadEvent()
    }
    static setIdModal(id) {
        this.idModal = id
    }
    static setIdCloseModal(id) {
        this.idCloseModal = id
    }

}