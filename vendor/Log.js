class Log {
    static INFO = "INFO"
    static WARNING = "WARNING"
    static ERROR = "ERROR"
    DEBUG = false
    static display(message, ERROR_TYPE) {
        if (!this.DEBUG) return
        console.log(`${Log.getTextDateAndTime()} ${ERROR_TYPE===undefined ? Log.INFO : ERROR_TYPE }: ${message}`);
    }

    static getTextDateAndTime() {
        const currentdate = new Date();
        return "[" + currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds() + "]";
    }
}
module.exports = Log