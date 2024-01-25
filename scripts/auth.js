
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

      getCurrentDate(date) {
        const currentDate = date || new Date();

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        const hour = currentDate.getHours().toString().padStart(2, '0');
        const minute = currentDate.getMinutes().toString().padStart(2, '0');
        const second = currentDate.getSeconds().toString().padStart(2, '0');

        return [day, month, year, hour, minute, second];
    }

    getSubtractDates(startDate, endDate) {
      const resultDate = new Date(
        startDate.getFullYear() - endDate[2],
        startDate.getMonth() - endDate[1],
        startDate.getDate() - endDate[0],
        startDate.getHours() - endDate[3],
        startDate.getMinutes() - endDate[4],
        startDate.getSeconds() - endDate[5]
      );
      
      return this.getCurrentDate(resultDate);
    }
        
      getItemsTimeInterval(id, timeFrom, timeTill) {
        // число0 месяц1 год2  час3 минута4 скунда5
        // ['15', '2', '2024', '13', '11', '21']
        const startDate = new Date(timeFrom[2] + '-'+timeFrom[1]+'-'+timeFrom[0]+'T'+timeFrom[3]+':'+timeFrom[4]+':'+timeFrom[5]+'Z'); // Устанавливаем начальную дату
        const endDate = new Date(timeTill[2] + '-'+timeTill[1]+'-'+timeTill[0]+'T'+timeTill[3]+':'+timeTill[4]+':'+timeTill[5]+'Z');   // Устанавливаем конечную дату
        // const endDate = new Date('2023-01-10T00:00:00Z');   // Устанавливаем конечную дату

        const timeFromFormat = Math.floor(startDate.getTime() / 1000);
        const timeTillFormat = Math.floor(endDate.getTime() / 1000);
        
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: 0,
            itemids: id,
            time_from: timeFromFormat,
            time_till: timeTillFormat,
            sortorder: "ASC"
          },
          auth: this.API,
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
          const responseData = JSON.parse(this.request.responseText);
            (responseData);
          if (responseData.result) {
            this.API = responseData.result;
      
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
    itemids: itemids,
    // time_from: timeFromFormat,
    // time_till: timeTillFormat,
    sortorder: "ASC"
  },
  auth: this.API,
  id: 1,
};
      
        // console.log(requestData);
        try {
          const zabbixData = this.getData('http://192.168.0.160/zabbix/api_jsonrpc.php', requestData);
          // console.log(zabbixData);
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
  
  }
    