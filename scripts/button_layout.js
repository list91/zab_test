export default class ButtonLayout {
    constructor(title, auth, range) {
        this.TITLE = title;
        this.RANGE = range;
        // alert(range);
        // alert(this.RANGE);
        this.AUTH = auth;
        this.createButton();
    }
    createButton(){
        this.BUTTON = document.createElement("button");
        this.BUTTON.classList.add("layout");
        this.BUTTON.setAttribute("type", "button");
        this.BUTTON.textContent = this.TITLE;
        this.BUTTON.addEventListener("click", ()=>{
            // alert(this.RANGE);
            let dateNow = new Date();
            let timeFrom = this.AUTH.getSubtractDates(dateNow, this.RANGE);
            // this.AUTH.getCurrentDate(new Date),
        
            const startDate = new Date(this.AUTH.getStringFormatDate(timeFrom));
            const endDate = new Date(this.AUTH.getStringFormatDate(this.AUTH.getCurrentDate(dateNow)));
            // const endDate = new Date(this.AUTH.getStringFormatDate([dateNow.getDay().toString(), dateNow.getMonth().toString(), dateNow.getFullYear().toString(), 
            //                                                         dateNow.getHours().toString(), dateNow.getMinutes().toString(), dateNow.getSeconds().toString()]));
            // startDate.toISOString().slice(0, 16);
            // alert(this.AUTH.getStringFormatDate([dateNow.getDay(), dateNow.getMonth(), dateNow.getFullYear(), 
            //     dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()]));
            // alert(startDate.toISOString().slice(0, 16));
            // alert(new Date().toISOString().slice(0, 16));
            // console.log(dateNow.getHours()+" dateNow.getHours()");
            // console.log(dateNow.getMinutes()+" dateNow.getMinutes()");
            // console.log(dateNow.toISOString()+" dateNow.toISOString()");
            document.getElementById('fromDateTime').value = startDate.toISOString().slice(0, 16);
            document.getElementById('toDateTime').value = endDate.toISOString().slice(0, 16);
        });
    }
}