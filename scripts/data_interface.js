import ButtonLayout from "./button_layout.js";
export default class DataInterface {
    constructor(authClass, itemClass) {
        this.ITEM = itemClass;
        this.AUTH = authClass;
        this.MAIN_CONTAINER = document.getElementsByClassName("main-content")[0];
        this.createInterfaceParams();
    }
    generate_class_name() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
        let result = '';
    
        for (let i = 0; i < 35; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
    
        return result;
    }

    processTableData(tableData) {
        if (!tableData || tableData.length === 0) {
          return [];
        }

        const intermediatePointsCount = 14;

        const dataPointsCount = tableData.length;

        const step = Math.floor(dataPointsCount / (intermediatePointsCount + 1));

        const intermediatePoints = [];

        for (let i = 1; i <= intermediatePointsCount; i++) {
          const index = i * step - 1;
          intermediatePoints.push(tableData[index]);
        }

        return intermediatePoints;
      }
      
      convertTimestampToReadableDate(timestamp) {
        const date = new Date(timestamp * 1000); // Умножаем на 1000, так как JavaScript ожидает миллисекунды
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Добавляем 1, так как месяцы в JavaScript начинаются с 0
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      push_form_mainContent(){
        this.MAIN_CONTAINER.appendChild(this.PARAMS_FORM);
        this.push_buttons();
      }
      push_buttons(){
        let buttonList = [
            new ButtonLayout("последние 5 минут", this.AUTH, [0, 0, 0, 0, 5, 0]),
            new ButtonLayout("последние 10 минут", this.AUTH, [0, 0, 0, 0, 10, 0]),
            new ButtonLayout("последние 15 минут", this.AUTH, [0, 0, 0, 0, 15, 0]),
            new ButtonLayout("последние 30 минут", this.AUTH, [0, 0, 0, 0, 30, 0]),
            new ButtonLayout("последний час", this.AUTH, [0, 0, 0, 1, 0, 0]),
            new ButtonLayout("последние 3 часа", this.AUTH, [0, 0, 0, 3, 0, 0]),
            new ButtonLayout("последние 6 часа", this.AUTH, [0, 0, 0, 6, 0, 0]),
            new ButtonLayout("последние 12 часов", this.AUTH, [0, 0, 0, 12, 0, 0]),
            new ButtonLayout("последний 1 день", this.AUTH, [0, 0, 1, 0, 0, 0])
        ]
        for (let index = 0; index < buttonList.length; index++) {
            document.getElementsByClassName("date_layout")[0].appendChild(buttonList[index].BUTTON);
        }

      }

      createInterfaceParams(){
        this.PARAMS_FORM = document.createElement("form");
        let date = document.createElement("div");
        date.classList.add("date");
        
        let inputs = document.createElement("div");
        inputs.classList.add("inputs");
        
        let p_from = document.createElement("p");
        let label_from = document.createElement("label");
        label_from.setAttribute("for", "fromDateTime");
        label_from.textContent = "От:";
        let input_from = document.createElement("input");
        input_from.setAttribute("type", "datetime-local");
        input_from.classList.add("datetime_input");
        input_from.id = "fromDateTime";
        p_from.appendChild(label_from);
        p_from.appendChild(input_from);
        
        let p_to = document.createElement("p");
        let label_to = document.createElement("label");
        label_to.setAttribute("for", "toDateTime");
        label_to.textContent = "До:";
        let input_to = document.createElement("input");
        input_to.setAttribute("type", "datetime-local");
        input_to.classList.add("datetime_input");
        input_to.id = "toDateTime";
        p_to.appendChild(label_to);
        p_to.appendChild(input_to);

        inputs.appendChild(p_from);
        inputs.appendChild(p_to);

        let date_layout = document.createElement("div");
        date_layout.classList.add("date_layout");

        date.appendChild(inputs);
        date.appendChild(date_layout);

        let button_run = document.createElement("button");
        button_run.id = "submit";
        button_run.setAttribute("type", "button");
        button_run.textContent = "Подтвердить"

        this.PARAMS_FORM.appendChild(date);        
        this.PARAMS_FORM.appendChild(button_run);        
      }
}