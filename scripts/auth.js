
export default class Auth {
    constructor(url, login, password) {
      this.URL = url;
      this.LOGIN = login;
      this.PASSWORD = password;
      this.request = new XMLHttpRequest();
      this.requestData = {
        jsonrpc: '2.0',
        method: 'user.login',
        params: {
          username: this.LOGIN,
          password: this.PASSWORD,
        },
        id: 1,
        auth: null,
      };
      this.initAuth()


    }
      initAuth() {
      this.authenticateAndGetAPI(this.URL, this.LOGIN, this.PASSWORD)
      }
      getData(url, data) {
        this.request.open('POST', url, false); // false указывает на синхронный режим
        this.request.setRequestHeader('Content-Type', 'application/json');
        this.request.send(JSON.stringify(data));
      
        if (this.request.status === 200) {
          return JSON.parse(this.request.responseText);
        } else {
          throw new Error(`HTTP error! Status: ${this.request.status}`);
        }
      }
      
      getItem(apiKey, host, key) {
        // const startDate = new Date('2023-01-01T00:00:00Z'); // Устанавливаем начальную дату
        // const endDate = new Date('2023-01-10T00:00:00Z');   // Устанавливаем конечную дату

        // const timeFrom = Math.floor(startDate.getTime() / 1000);  // Получаем timestamp начальной даты
        // const timeTill = Math.floor(endDate.getTime() / 1000);  "46399"
        
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: 0,
            itemids: "46399",  // Замените на фактический идентификатор элемента данных
            // time_from: "1705401697",
            // time_till: "1705402538",
            // sortfield: "none", // Указываем "none" для отсутствия сортировки
            sortorder: "ASC"
            // host: host,
            // search: { key_: key },
          },
          auth: apiKey,
          id: 1,
        };
      
        // console.log(requestData);
        try {
          const zabbixData = this.getData('http://192.168.0.160/zabbix/api_jsonrpc.php', requestData);
          console.log(zabbixData);
          if (zabbixData.result && zabbixData.result.length > 0) {
            console.log(zabbixData);
            return zabbixData.result;  
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
      
      authenticateAndGetAPI(url, username, password) {
        
        this.request.open('POST', url, false);
        this.request.setRequestHeader('Content-Type', 'application/json');
      
        const authData = {
          jsonrpc: '2.0',
          method: 'user.login',
          params: {
            username: username,
            password: password,
          },
          id: 1,
        };
      
        this.request.send(JSON.stringify(authData));
      
        if (this.request.status === 200) {
          // alert(1);
          const responseData = JSON.parse(this.request.responseText);
            (responseData);
          if (responseData.result) {
            // console.log('Authentication successful');
            // const authToken = responseData.result;
            this.API = responseData.result;
            // this.getItem(this.API, "Zabbix server", "vfs.fs.dependent.size[/,pused]")
      
          } else {
            console.error('Authentication failed');
          }
        } else {
          console.error(`HTTP error! Status: ${this.request.status}`);
        }
      }
      getAllItems(apiKey, itemids) {
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: 0,
            itemids: itemids,  // Замените на фактический идентификатор элемента данных
            // time_from: "1705999635",
            // time_till: "1705999657",
            // sortfield: "none", // Указываем "none" для отсутствия сортировки
            // sortorder: "ASC"
            // host: host,
            // search: { key_: key },
          },
          auth: apiKey,
          id: 1,
        };
      
        // console.log(requestData);
        try {
          const zabbixData = this.getData('http://192.168.0.160/zabbix/api_jsonrpc.php', requestData);
          // console.log(zabbixData);
          if (zabbixData.result && zabbixData.result.length > 0) {
            // console.log(zabbixData);
            return zabbixData.result;  
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
  
  }
    