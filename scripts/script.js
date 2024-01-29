import Auth from "./auth.js";
import Graph from "./graph.js";
import Item from "./item.js";

const apiUrl = 'http://192.168.0.160/zabbix/api_jsonrpc.php';
const auth = new Auth(apiUrl, "Admin", "zabbix");
// auth.initAuth();
const items_info = auth.getItemsByHostName("Zabbix server")
// console.log(items_info);
for (let index = 0; index < items_info.length; index++) {
    const item = items_info[index];
    const new_item = new Item(item.name, item.itemid, item.type, item.key, auth);
    const zebra_list = document.getElementsByClassName("zebra_list")[0];

    console.log(item.name+" --- "+item.itemid+" --- "+item.type+" --- "+item.key);
    
    zebra_list.appendChild(new_item.get_item_block_li());
}
