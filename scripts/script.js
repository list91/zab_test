import Auth from "./auth.js";
import Item from "./item.js";
import ButtonLayout from "./button_layout.js";
const apiUrl = 'http://192.168.0.160/zabbix/api_jsonrpc.php';
const auth = new Auth(apiUrl, "Admin", "zabbix");
// auth.initAuth();
const items_info = auth.getItemsByHostName("Zabbix server")
// console.log(items_info);
const zebra_list = document.createElement("ul");
zebra_list.classList.add("zebra_list");
for (let index = 0; index < items_info.length; index++) {
    const item = items_info[index];
    const new_item = new Item(item.name, item.itemid, item.value_type, item.key, auth);

    zebra_list.appendChild(new_item.get_item_block_li());
}
document.getElementsByClassName("main-content")[0].appendChild(zebra_list);
