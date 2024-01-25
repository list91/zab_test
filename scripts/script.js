import Auth from "./auth.js";
import Graph from "./graph.js";


const apiUrl = 'http://192.168.0.160/zabbix/api_jsonrpc.php';
const auth = new Auth(apiUrl, "Admin", "zabbix");

new Graph(auth.getAllItems(auth.API, "46767"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46843"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46846"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46847"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46844"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46841"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46848"), 1000).run_display_graph();
new Graph(auth.getAllItems(auth.API, "46845"), 1000).run_display_graph();

let q = auth.getSubtractDates(
        new Date(),
        [0, 0, 10, 0, 1, 0]
);

console.log(q);
