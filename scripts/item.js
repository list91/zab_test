import Graph from "./graph.js";
import Table from "./table.js";

export default class Item {
    constructor(name, id, type, key, auth) {
        this.AUTH = auth;
        this.NAME = name;
        this.ID = id;
        this.TYPE = type;
        this.KEY = key;
        this.createNewLiBlockForDocument();
    }

    initGraph(){
        const graph = new Graph(this.AUTH, this.ID);
        graph.run_display_graph(1000);
    }

    clearFirstBlockByClass(className){
        let scene = document.getElementsByClassName(className)[0];
        scene.innerHTML = "";
    }
    
    createNewLiBlockForDocument(){
        this.LI_BLOCK = document.createElement("li");
        // this.LI_BLOCK.classList.add();
        
        let title = document.createElement("div");
        title.classList.add("zebra_list_item_title");
        title.textContent = this.NAME;
        
        let buttons_block = document.createElement("div");
        buttons_block.classList.add("zebra_list_item_buttons");
        
        let button_graph = document.createElement("div");
        button_graph.classList.add("nav_button");
        let button_graph_link = document.createElement("a")
        button_graph_link.addEventListener("click",()=>{

            let className = "main-content";
            this.clearFirstBlockByClass(className);
            let block = document.createElement("div")
            block.id = "graphs";
            document.getElementsByClassName(className)[0].appendChild(block);
            let blockGraph = document.createElement("div")
            blockGraph.id = "graph_container";
            document.getElementsByClassName(className)[0].appendChild(blockGraph);
            this.initGraph();
        });
        button_graph_link.textContent = "график";
        button_graph_link.classList.add("button_a");
        button_graph_link.href = "#"


        let button_table = document.createElement("div");
        button_table.classList.add("nav_button");
        let button_table_link = document.createElement("a")
        button_table_link.textContent = "таблица";
        button_table_link.classList.add("button_a");
        button_table_link.href = "#"
        button_table_link.addEventListener("click",()=>{
            let className = "main-content";
            this.clearFirstBlockByClass(className);
            new Table(this.AUTH, this)
            //     console.log(this.AUTH.getItemsTypeTimeInterval(
        //         this.ID,
        //         this.AUTH.getSubtractDates(new Date, [0, 0, 0, 1, 0, 0]),
        //         this.AUTH.getCurrentDate(new Date),
        //         this.TYPE
        // ));
            // let className = "main-content";
            // this.clearFirstBlockByClass(className);
            // let block = document.createElement("div")
            // block.id = "graphs";
            // document.getElementsByClassName(className)[0].appendChild(block);
            // let blockGraph = document.createElement("div")
            // blockGraph.id = "graph_container";
            // document.getElementsByClassName(className)[0].appendChild(blockGraph);
            // this.initGraph();
        });


        button_graph.appendChild(button_graph_link);
        button_table.appendChild(button_table_link);
        
        if(this.TYPE == "0"){
            buttons_block.appendChild(button_graph);
        } else{
            // console.log(this.NAME+" - "+this.TYPE);
        }
        
        buttons_block.appendChild(button_table);

        this.LI_BLOCK.appendChild(title);        
        this.LI_BLOCK.appendChild(buttons_block);
    }
    get_item_block_li(){
        return this.LI_BLOCK;
    }
}