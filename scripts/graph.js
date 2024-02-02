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
    // run_display_graph(interval, from){
    //     if(this.UPDATE_TASK_ID){
    //         this.cancel_runprocess();
    //     }
    //     this.UPDATE_TASK_ID = setInterval(async () => {
    //         console.log(from);
    //         console.log(this.AUTH.getCurrentDate(new Date()));
            
    //         await this.update_from_to(
    //             this.AUTH.getCurrentDate(new Date(from)),
    //             this.AUTH.getCurrentDate(new Date())
    //         );

    //         this.update_display_graph();
    //     }, interval);
        
    // }
    


    

    

}