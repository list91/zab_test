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
    initConfirmButton(){
        this.CONFIRM_BUTTON = document.getElementById("submit");
        this.CONFIRM_BUTTON.addEventListener("click", ()=>{
            let from = document.getElementById("fromDateTime");
            let to = document.getElementById("toDateTime");
            this.FROM = from.value;
            // console.log(new Date(from.value)+" new Date(from.value)");
            // console.log(new Date(to.value)+" new Date(to.value)");
            // this.GRAPH.cancel_runprocess();
            this.GRAPH.update_from_to(
                this.AUTH.getCurrentDate(new Date(from.value)), 
                this.AUTH.getCurrentDate(new Date())
                );
            this.GRAPH.update_display_graph("graphChar");
        });
    }
    initConfirmButtonT(){
        this.CONFIRM_BUTTON = document.getElementById("submit");
        this.CONFIRM_BUTTON.addEventListener("click", ()=>{
            let from = document.getElementById("fromDateTime");
            let to = document.getElementById("toDateTime");
            // console.log(new Date(from.value)+" new Date(from.value)");
            // console.log(new Date(to.value)+" new Date(to.value)");
            this.TABLE.update_from_to(
                this.AUTH.getCurrentDate(new Date(from.value)), 
                this.AUTH.getCurrentDate(new Date(to.value))
                );
            
            this.GRAPH_DIV.innerHTML = "";
            const graph = document.createElement("canvas");
            graph.classList.add(this.CLASS_NAME);
            graph.id = "graphChar";
            graph.classList.add("graph");
            this.GRAPH_DIV.appendChild(graph);
                
            // this.GRAPH.update_display_graph("graphChar");
            // this.TABLE.update_from_to()
        });
    }
    async initGraph() {
        this.FROM = this.AUTH.getSubtractDates(new Date, [0, 0, 0, 0, 1, 0]);
        this.GRAPH = new Graph(this.AUTH, this.ID, 
                              this.FROM,
                              this.AUTH.getCurrentDate(new Date),
                              this.NAME
                              );
        
        await this.GRAPH.update_display_graph(); // Добавлен await
        // this.GRAPH.run_display_graph(10000, this.FROM); // Добавлен await
        
        this.initConfirmButton();
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
        button_graph_link.addEventListener("click", async () => {
            console.log("1"); // Вывод "1" до начала асинхронного действия
          
            let className = "main-content";
            this.clearFirstBlockByClass(className);
          
            let block = document.createElement("div");
            block.id = "graphs";
            document.getElementsByClassName(className)[0].appendChild(block);
          
            let blockGraph = document.createElement("div");
            blockGraph.id = "graph_container";
            document.getElementsByClassName(className)[0].appendChild(blockGraph);
          
            // Асинхронная функция initGraph
            await this.initGraph();
          
            console.log("2"); // Вывод "2" после завершения асинхронного действия
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
            this.TABLE = new Table(this.AUTH, this, 
                this.AUTH.getSubtractDates(new Date, [0, 0, 0, 0, 1, 0]),
                this.AUTH.getCurrentDate(new Date),
                this.NAME
                );
            this.initConfirmButtonT();
            document.getElementsByClassName("main-content")[0].appendChild(this.TABLE.TABLE_ELEM)
        });


        button_graph.appendChild(button_graph_link);
        button_table.appendChild(button_table_link);
        
        if(this.TYPE == "0"){
            buttons_block.appendChild(button_graph);
        }
        // buttons_block.appendChild(button_table);

        this.LI_BLOCK.appendChild(title);        
        this.LI_BLOCK.appendChild(buttons_block);
    }
    get_item_block_li(){
        return this.LI_BLOCK;
    }
}