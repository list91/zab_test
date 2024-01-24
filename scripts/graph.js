export default class Graph {
    constructor(arr, interval) {
        // this.IS_RUNNING = false;
        this.UPDATE_INTERVAL = interval;
        this.ARRAY_LONG = arr;
        this.create_graph_block();
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
    create_graph_block(){
        let graph_block = document.createElement("div");
        
        while(1){
            let class_name = this.generate_class_name();
            if (document.getElementsByClassName(class_name).length == 0){
                this.CLASS_NAME = class_name;
                break;
            }
        }

        const graph = document.createElement("div");
        graph.classList.add(this.CLASS_NAME);
        
        graph.classList.add("graph");

        let header_graph_block = document.createElement("div");
        header_graph_block.classList.add("header_graph_block");
        
        let header_graph_block__title = document.createElement("div");
        header_graph_block__title.textContent = "Заголовок"
        header_graph_block__title.classList.add("header_graph_block__title");

        let header_graph_block__buttons_block = document.createElement("div");
        header_graph_block__buttons_block.classList.add("header_graph_block__buttons_block");

        let header_graph_block__buttons_block__btn_conf = document.createElement("div");
        header_graph_block__buttons_block__btn_conf.classList.add("header_graph_block__buttons_block__btn_conf");

        let header_graph_block__buttons_block__btn_wdg = document.createElement("div");
        header_graph_block__buttons_block__btn_wdg.classList.add("header_graph_block__buttons_block__btn_wdg");
        
        let btn_conf = document.createElement("button");
        btn_conf.classList.add("btn_conf");

        let btn_wdg = document.createElement("button");
        btn_wdg.classList.add("btn_wdg");
        
        let svg_gear = document.createElement("img");
        svg_gear.classList.add("button_graph");
        svg_gear.src = 'img/1336392323.svg';
        svg_gear.height = 100;
        svg_gear.width = 100;
        
        let img_wdg = document.createElement("img");
        img_wdg.classList.add("button_graph");
        img_wdg.src = 'img/icons8-ellipsis-48.png';
        img_wdg.height = 100;
        img_wdg.width = 100;

        
        graph_block.appendChild(header_graph_block);
        graph_block.appendChild(graph);

        header_graph_block.appendChild(header_graph_block__title);
        header_graph_block.appendChild(header_graph_block__buttons_block);

        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_conf);
        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_wdg);

        header_graph_block__buttons_block__btn_conf.appendChild(btn_conf);
        btn_conf.appendChild(svg_gear);

        header_graph_block__buttons_block__btn_wdg.appendChild(btn_wdg);
        btn_wdg.appendChild(img_wdg);

        



        document.getElementById("graph_container").appendChild(graph_block);
    }
    get_datatime_list(list){
        let new_list = []
        for (let index = 0; index < list.length; index++) {
          new_list.push(this.convertTimestampToReadableDate(list[index]))
        }
        return new_list;
      }
    cancel_runprocess(){
        clearInterval(this.UPDATE_TASK_ID);
    }
    run_display_graph(){

        this.UPDATE_TASK_ID = setInterval(
            this.update_display_graph(this.CLASS_NAME),
            this.UPDATE_INTERVAL
        );
    }
    update_display_graph(){
        
        // тут получили массив с ЗАББИКСА 
        // с неограниченной выборкой точек
        // this.ARRAY_LONG;

        var series_list = []
        var labels_list = []

        for (let index = 0; index < this.ARRAY_LONG.length; index++) {
            series_list.push(this.ARRAY_LONG[index]["value"]);
            labels_list.push(this.ARRAY_LONG[index]["clock"]);
        }
        var data = {
        labels: this.get_datatime_list(this.processTableData(labels_list)),
        series: [this.processTableData(series_list)]
    }
        console.log(data)
        // new Chartist.Line('.ct-chart-1', data);
        new Chartist.Line("."+this.CLASS_NAME, data);
    }
    processTableData(tableData) {
        if (!tableData || tableData.length === 0) {
          return [];
        }

        const intermediatePointsCount = 4;

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

}