export default class ButtonLayout {
    constructor(title, auth, range, interfaceClass) {
        this.TITLE = title;
        this.INTERFACE = interfaceClass;
        this.RANGE = range;
        this.AUTH = auth;
        this.createButton();
    }
    createButton(){
        this.BUTTON = document.createElement("button");
        this.BUTTON.classList.add("layout");
        this.BUTTON.setAttribute("type", "button");
        this.BUTTON.textContent = this.TITLE;
        this.BUTTON.addEventListener("click", ()=>{

            let dateNow = new Date();
            let timeFrom = this.AUTH.getSubtractDates(dateNow, this.RANGE);
            // alert(1);
            // const startDate = new Date(this.AUTH.getStringFormatDate(timeFrom));
            // const endDate = new Date(this.AUTH.getStringFormatDate(this.AUTH.getCurrentDate(dateNow)));

            // document.getElementById('fromDateTime').value = startDate.toISOString().slice(0, 16);
            // document.getElementById('toDateTime').value = endDate.toISOString().slice(0, 16);

            this.INTERFACE.run_display_graph(2000, timeFrom);
        });
    }
}