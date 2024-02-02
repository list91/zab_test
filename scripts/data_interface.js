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
    async update_from_to(from, to){
      
      this.from = from;
      this.to = to;
    }

    async longAsyncProcess() {
      // Асинхронный метод, который выполняется долго
      await new Promise(resolve => setTimeout(resolve, 3000)); // Пример задержки в 3 секунды
      console.log('Асинхронный метод завершен');
  }

    //
    async run_display_graph(interval, range) {
      // Если поток запущен, прервать его
      if (this.UPDATE_TASK_ID) {
          this.cancel_runprocess();
      }
  
      let running = false; // Флаг для отслеживания выполнения асинхронного метода
  
      this.UPDATE_TASK_ID = setInterval(async () => {
          if (!running) {
              running = true;
  
              let dateNow = new Date();
              let from = this.AUTH.getSubtractDates(dateNow, range);
  
              this.update_from_to(
                  from,
                  this.AUTH.getCurrentDate(dateNow)
              );
  
              await this.update_display_graph();
              
              running = false; // После завершения выполнения снимаем флаг выполнения
          }
      }, interval);
  }
  
  // async udate_array() {
  //     // alert(this.ID_ITEM);
  //     this.ARRAY_LONG = await this.AUTH.getItemsTimeInterval(this.ID_ITEM, this.from, this.to);
  // }
  //   //
  //   run_display_graph(interval, range) {
      
  //     //если поток запущен то прервать его
  //     if (this.UPDATE_TASK_ID) {
  //         this.cancel_runprocess();
  //     }
  
  //     const runIteration = () => {
  //         let dateNow = new Date();
  //         let from = this.AUTH.getSubtractDates(dateNow, range);
  //         console.log(from);
  //         this.update_from_to(
  //             from,
  //             this.AUTH.getCurrentDate(dateNow)
  //         );
  
  //         this.update_display_graph().then(() => {
  //             setTimeout(runIteration, interval);
  //         });
  //     };
  
  //     this.UPDATE_TASK_ID = setTimeout(runIteration, 0); // Начинаем первую итерацию без задержки
  // }
  async udate_array(){
    // alert(this.ID_ITEM);
     this.ARRAY_LONG = await this.AUTH.getItemsTimeInterval(this.ID_ITEM, this.from, this.to);
}
  async update_display_graph(){

    let spinCheck = document.getElementsByClassName("spinner-container");
    if (spinCheck.length == 0){
        this.AUTH.create_spin();
        this.MAIN_CONTAINER.appendChild(this.AUTH.SPIN);
    } else {
        // тут я включаю спиннер
        this.AUTH.spin_yes();
    }
    console.log("await this.udate_array(); START")
    await this.udate_array();
    console.log("await this.udate_array(); END")
    let max_x = 0;
    let max_y = 0;
    
    let start_x = 0;


    if (this.ARRAY_LONG) {
        const dataPoints = [];
        if (this.ARRAY_LONG.length){

            start_x = this.ARRAY_LONG[0]["clock"];
            // console.log(this.ARRAY_LONG);
            
            
            for (let index = 0; index < this.ARRAY_LONG.length; index++) {
                let point = {};
                let dateInSeconds = this.ARRAY_LONG[index]["clock"];
                let dateInMilliseconds = dateInSeconds * 1000;
                
                point["x"] = dateInMilliseconds;
                point["y"] = this.ARRAY_LONG[index]["value"];
                
                if (parseInt(dateInMilliseconds) > parseInt(max_x)) {
                    max_x = dateInMilliseconds;
                }
                if (parseFloat(point["y"]) > parseFloat(max_y)) {
                    max_y = point["y"];
                }
                
                dataPoints.push(point);
            }
            max_y = max_y*1.25
            
            dataPoints.sort((a, b) => a.x - b.x);
        }
    
        const data = {
            datasets: [
                {
                    label: this.name,
                    data: dataPoints,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                }
            ]
        };
    

        // тут убираю отображение спиннера
        this.AUTH.spin_no();

        // this.GRAPH_DIV.innerHTML = "";
        // const graph = document.createElement("canvas");
        // graph.classList.add(this.CLASS_NAME);
        // graph.id = "graphChar";
        // graph.classList.add("graph");
        // this.GRAPH_DIV.appendChild(graph);
        this.update_div_graph()
        console.log(44);
        const ctx = document.getElementById("graphChar");
        // alert(max_y);
        // alert(max_x);
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                hover: {mode: null},
                events: [],
                animation: {
                    // Отключение анимаций
                    duration: 0
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        stepSize: 50,
                        max: max_y
                    },
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: this.from,
                        max: this.to,
                        ticks: {
                            callback: function (value, index, values) {
                                let date = new Date(value);
                                return `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
                            }
                        }
                    }
                }
            }
        });
    }
    
 }
      async update_div_graph(){
          this.GRAPH_DIV.innerHTML = "";
          const graph = document.createElement("canvas");
          graph.classList.add(this.CLASS_NAME);
          graph.id = "graphChar";
          graph.classList.add("graph");
          this.GRAPH_DIV.appendChild(graph);
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
            new ButtonLayout("последние 5 секунд", this.AUTH, [0, 0, 0, 0, 0, 5], this),
            new ButtonLayout("последние 5 минут", this.AUTH, [0, 0, 0, 0, 5, 0], this),
            new ButtonLayout("последние 10 минут", this.AUTH, [0, 0, 0, 0, 10, 0], this),
            new ButtonLayout("последние 15 минут", this.AUTH, [0, 0, 0, 0, 15, 0], this),
            new ButtonLayout("последние 30 минут", this.AUTH, [0, 0, 0, 0, 30, 0], this),
            new ButtonLayout("последний 1 час", this.AUTH, [0, 0, 0, 1, 0, 0], this),
            new ButtonLayout("последние 3 часа", this.AUTH, [0, 0, 0, 3, 0, 0], this),
            new ButtonLayout("последние 6 часа", this.AUTH, [0, 0, 0, 6, 0, 0], this),
            new ButtonLayout("последние 12 часов", this.AUTH, [0, 0, 0, 12, 0, 0], this),
            new ButtonLayout("последний 1 день", this.AUTH, [0, 0, 1, 0, 0, 0], this)
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

        
        let button_run = document.createElement("button");
        button_run.id = "submit";
        button_run.classList.add("layout");
        button_run.classList.add("layout_confirm");
        button_run.setAttribute("type", "button");
        button_run.textContent = "Подтвердить"
        
        let button_auto_update_box = document.createElement("div");
        button_auto_update_box.classList.add("button_auto_update_box");
        
        let button_auto_update = document.createElement("button");
        button_auto_update.id = "submit";
        button_auto_update.classList.add("layout");
        button_auto_update.classList.add("layout_confirm");
        button_auto_update.setAttribute("type", "button");
        button_auto_update.textContent = "Автообновление"
        
        let button_auto_update_check = document.createElement("input");
        button_auto_update_check.id = "myCheckbox";
        button_auto_update_check.setAttribute("type", "checkbox");
        
        let button_auto_update_check_container = document.createElement("div");
        button_auto_update_check_container.classList.add("checkbox-container");
        
        let data_container = document.createElement("div");
        data_container.classList.add("data_inputs_container");
        data_container.appendChild(inputs);
        data_container.appendChild(button_run);
        // data_container.appendChild(button_run);
        date.appendChild(data_container);
        date.appendChild(date_layout);

        this.PARAMS_FORM.appendChild(date);        
        
        this.PARAMS_FORM.appendChild(button_auto_update_box);        
        
        // button_auto_update_box.appendChild(button_run);        
        // button_auto_update_box.appendChild(button_auto_update);        
        // button_auto_update_box.appendChild(button_auto_update_check_container);        
        button_auto_update_check_container.appendChild(button_auto_update_check);        
      }
}