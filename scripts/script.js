import Auth from "./auth.js";
import Graph from "./graph.js";


const apiUrl = 'http://192.168.0.160/zabbix/api_jsonrpc.php';
const auth = new Auth(apiUrl, "Admin", "zabbix");

// new Graph(auth.getAllItems("46767"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46843"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46846"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46847"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46844"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46841"), 1000).run_display_graph();
// new Graph(auth.getAllItems("46848"), 1000).run_display_graph();

new Graph(
        auth.getItemsTimeInterval(
                "42264",
                auth.getSubtractDates(new Date, [0, 0, 0, 0, 10, 0]),
                // auth.getSubtractDates(new Date, [0, 0, 0, 1, 0, 0])
                auth.getCurrentDate(new Date)
        ), 
        1000
        ).run_display_graph();


// let q = auth.getSubtractDates(
//         new Date(),
//         [0, 0, 10, 0, 1, 0]
// );

// console.log(q);
