import DataInterface from "./data_interface.js";
export default class Graph extends DataInterface {
    constructor(auth, item, from, to, name){
        super(auth, item);
        this.ID_ITEM = item;
        this.name = name;
        this.update_from_to(from, to);
        this.create_graph_block();
    }
    create_graph_block(){
        this.GRAPH_DIV = document.createElement("div");
        
        while(1){
            let class_name = this.generate_class_name();
            if (document.getElementsByClassName(class_name).length == 0){
                this.CLASS_NAME = class_name;
                break;
            }
        }

        const graph = document.createElement("canvas");
        graph.classList.add(this.CLASS_NAME);
        graph.id = "graphChar";
        
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
        let btn_conf_menu = document.createElement("div");
        btn_conf_menu.classList.add("btn_conf_menu");
        btn_conf_menu.textContent = "приветekjrrejtirjeiotjrieojtiorejtoijreotjorektpoertoijreiotjieojtwoipejrwitjreijfirojoif"
        btn_conf.addEventListener("click", function() {

        });
        

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

        this.GRAPH_DIV.appendChild(header_graph_block);
        this.GRAPH_DIV.appendChild(graph);

        header_graph_block.appendChild(header_graph_block__title);
        // header_graph_block.appendChild(header_graph_block__buttons_block);

        header_graph_block__buttons_block.appendChild(btn_conf_menu);
        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_conf);
        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_wdg);

        header_graph_block__buttons_block__btn_conf.appendChild(btn_conf);
        btn_conf.appendChild(svg_gear);

        header_graph_block__buttons_block__btn_wdg.appendChild(btn_wdg);
        btn_wdg.appendChild(img_wdg);
        let gc = document.createElement("div");
        gc.id = "graph_container";
        gc.appendChild(this.GRAPH_DIV);
        this.push_form_mainContent();
        // alert(this.MAIN_CONTAINER);
        this.MAIN_CONTAINER.appendChild(gc);

    }

    cancel_runprocess(){
        clearInterval(this.UPDATE_TASK_ID);
    }
    run_display_graph(interval, from){
        this.UPDATE_TASK_ID = setInterval(async () => {
            console.log(from);
            console.log(this.AUTH.getCurrentDate(new Date()));
            
            await this.update_from_to(
                this.AUTH.getCurrentDate(new Date(from)),
                this.AUTH.getCurrentDate(new Date())
            );

            this.update_display_graph();
        }, interval);
        
    }
    


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

        await this.udate_array();
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

            this.GRAPH_DIV.innerHTML = "";
            const graph = document.createElement("canvas");
            graph.classList.add(this.CLASS_NAME);
            graph.id = "graphChar";
            graph.classList.add("graph");
            this.GRAPH_DIV.appendChild(graph);
        
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

}