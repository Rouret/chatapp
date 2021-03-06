export default class Chat {
    static USER = "user"
    static OTHER = "other"

    static display(idBox, name, avatar, msg, who) {
        $(idBox).append(Chat.getTextMessage(name, avatar, msg, who))
    }
    static getTime() {
        const currentdate = new Date();
        return currentdate.getHours() + ":" +
            currentdate.getMinutes()
    }
    static getTextMessage(name, avatar, msg, who) {
        return `
		<div class="msg ${who==Chat.USER ? "right-msg" : "left-msg" }">
			<div class="msg-img" style="background-image: url(${avatar})"></div>
			<div class="msg-bubble">
				<div class="msg-info">
					<div class="msg-info-name">${name}</div>
					<div class="msg-info-time">${Chat.getTime()}</div>
				</div>
				<div class="msg-text">
				${msg}
				</div>
			</div>
		</div>
		`
    }

}