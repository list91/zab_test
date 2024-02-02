export default class ButtonLayout {
    constructor(title, auth, range, interfaceClass) {
        this.TITLE = title;
        this.INTERFACE = interfaceClass;
        this.RANGE = range;
        this.AUTH = auth;
        this.IS_ACTIVE = false;
        this.createButton();
    }
    createButton(){
        this.BUTTON = document.createElement("button");
        this.BUTTON.classList.add("layout");
        this.BUTTON.setAttribute("type", "button");
        this.BUTTON.textContent = this.TITLE;
        this.BUTTON.addEventListener("click", ()=>{
            
            let active_btns = document.getElementsByClassName("active");
            if(active_btns.length != 0){
                for (let index = 0; index < active_btns.length; index++) {
                    active_btns[index].classList.remove("active");
                }
            }

            let dateNow = new Date();
            let timeFrom = this.AUTH.getSubtractDates(dateNow, this.RANGE);
            
            // alert(1);
            // const startDate = new Date(this.AUTH.getStringFormatDate(timeFrom));
            // const endDate = new Date(this.AUTH.getStringFormatDate(this.AUTH.getCurrentDate(dateNow)));

            // document.getElementById('fromDateTime').value = startDate.toISOString().slice(0, 16);
            // document.getElementById('toDateTime').value = endDate.toISOString().slice(0, 16);

            // this.INTERFACE.delayedTask().then(message => {
            //     console.log(1999999);
            // });
            this.INTERFACE.run_display_graph(50, this.RANGE);
            this.BUTTON.classList.add("active");
        });
    }
}