import DataInterface from "./data_interface.js";
export default class Table extends DataInterface {
    constructor(auth, item){
        super(auth, item);
        this.ID_ITEM = item.ID;
        this.TYPE = item.TYPE;
        this.initArr();
        this.create_table_block();
    }
    getFormatTypeList(value0, value1, value2){
        if(this.TYPE == "0"){
            return [value0, value1, value2];
        } else {
            return [value0, value1];
        }
    }
    initArr(){
        const arr = this.AUTH.getItemsTypeTimeInterval(
            this.ID_ITEM,
            this.AUTH.getSubtractDates(new Date, [0, 0, 0, 1, 0, 0]),
            this.AUTH.getCurrentDate(new Date),
            this.TYPE
        )
        let theader = this.getFormatTypeList("время", "значение", "измененние");
        
        let tbody = {};
        for (let index = 0; index < arr.length; index++) {
            let new_line = this.getFormatTypeList(arr[index]["clock"], arr[index]["value"], "NULL");
            tbody[index] = new_line;
        }
        this.TABLE_ARRAY = {"head": theader, 
                            "body": tbody};
        // console.log(this.TABLE_ARRAY);
    }

    create_table_block(){
        this.TABLE_ELEM = document.createElement("table");
        
        let thead = document.createElement("thead");
        let thead_tr = document.createElement("tr");
        let head_arr = this.TABLE_ARRAY["head"];
        for (let index = 0; index < head_arr.length; index++) {
            let new_th = document.createElement("th");
            new_th.textContent = head_arr[index];
            thead_tr.appendChild(new_th);
        }
        thead.appendChild(thead_tr);
        let tbody = document.createElement("tbody");
        let body_arr = this.TABLE_ARRAY["body"];

        for (let i = 0; i < Object.keys(body_arr).length; i++) {
            let new_tr = document.createElement("tr");
            let body_row = body_arr[i]
            for (let j = 0; j < Object.keys(body_row).length; j++) {
                let new_td = document.createElement("td");
                new_td.textContent = body_row[j];
                new_tr.appendChild(new_td);
            }
            tbody.appendChild(new_tr);
        }
        this.TABLE_ELEM.appendChild(thead);
        this.TABLE_ELEM.appendChild(tbody);
        document.getElementsByClassName("main-content")[0].appendChild(this.TABLE_ELEM)
    }
}