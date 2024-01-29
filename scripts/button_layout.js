export default class ButtonLayout {
    constructor(title, auth, range) {
        this.TITLE = title;
        this.RANGE = range;
        this.AUTH = auth;
    }
    createButton(){
        this.BUTTON = document.createElement("button");
        this.BUTTON.classList.add("layout");
        this.BUTTON.textContent = this.TITLE;
    }
    event(){
        let timeFrom = this.AUTH.getSubtractDates(new Date, RANGE);
        // this.AUTH.getCurrentDate(new Date),

        const startDate = new Date(timeFrom[2] + '-'+timeFrom[1]+'-'+timeFrom[0]+'T'+timeFrom[3]+':'+timeFrom[4]+':'+timeFrom[5]+'Z');
        // startDate.toISOString().slice(0, 16);
        document.getElementById('fromDateTime').value = startDate.toISOString().slice(0, 16);
        document.getElementById('toDateTime').value = new Date().toISOString().slice(0, 16);
    }
}