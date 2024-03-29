
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
        // console.log(this.request);
        // console.log(this.request.responseText);
      
        if (this.request.status === 200) {
          // alert(this.request.responseText);
          return JSON.parse(this.request.responseText);
        } else {
          throw new Error(`HTTP error! Status: ${this.request.status}`);
        }
      }
      processTableData(tableData) {
        if (!tableData || tableData.length === 0) {
          return [];
        }

        const intermediatePointsCount = 25;

        const dataPointsCount = tableData.length;

        const step = Math.floor(dataPointsCount / (intermediatePointsCount + 1));

        const intermediatePoints = [];

        for (let i = 1; i <= intermediatePointsCount; i++) {
          const index = i * step - 1;
          intermediatePoints.push(tableData[index]);
        }

        return intermediatePoints;
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
        
    getStringFormatDate(list){
      console.log(list);
      return list[2] + '-'+list[1]+'-'+list[0]+'T'+list[3]+':'+list[4]+':'+list[5]+'Z';
    }
      getItemsTimeInterval(id, timeFrom, timeTill) {
        // console.log(timeFrom);
        // console.log(timeTill);
        const startDate = new Date(this.getStringFormatDate(timeFrom));
        const endDate = new Date(this.getStringFormatDate(timeTill));
        const timeFromFormat = Math.floor(startDate.getTime() / 1000);
        const timeTillFormat = Math.floor(endDate.getTime() / 1000);        
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: 0,
            itemids: id,
            time_from: timeFromFormat-25200,
            time_till: timeTillFormat-25200,
            sortorder: "ASC"
          },
          auth: this.API,
          id: 1,
        };
        try {
          const zabbixData = this.getData('http://192.168.0.160/zabbix/api_jsonrpc.php', requestData);
          if (zabbixData.result && zabbixData.result.length > 0) {
            return zabbixData.result;
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
      getItemsTypeTimeInterval(id, timeFrom, timeTill, type) {
        console.log(timeFrom);
        console.log(timeTill);
        const startDate = new Date(timeFrom[2] + '-'+timeFrom[1]+'-'+timeFrom[0]+'T'+timeFrom[3]+':'+timeFrom[4]+':'+timeFrom[5]+'Z');
        const endDate = new Date(timeTill[2] + '-'+timeTill[1]+'-'+timeTill[0]+'T'+timeTill[3]+':'+timeTill[4]+':'+timeTill[5]+'Z');
        const timeFromFormat = Math.floor(startDate.getTime() / 1000);
        const timeTillFormat = Math.floor(endDate.getTime() / 1000);        
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: parseInt(type, 10),
            itemids: id,
            time_from: timeFromFormat-25200,
            time_till: timeTillFormat-25200,
            sortorder: "ASC"
          },
          auth: this.API,
          id: 1,
        };
        // console.log(requestData);
        try {
          const zabbixData = this.getData('http://192.168.0.160/zabbix/api_jsonrpc.php', requestData);
          if (zabbixData.result && zabbixData.result.length > 0) {
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

      getAllItems(itemids) {
        const requestData = {
          jsonrpc: '2.0',
          method: "history.get",
          params: {
            output: "extend",
            history: 0,
            itemids: itemids,
            sortorder: "ASC"
          },
          auth: this.API,
          id: 1,
        };
      
        try {
          const zabbixData = this.getData(this.URL, requestData);
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
      
    
    getItemsByHostName(name) {
    // Формируем данные запроса
    const requestData = {
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
            output: ['hostid', 'host'],
            filter: {
                host: [name]
            }
        },
        auth: this.API,
        id: 1
    };
    // console.log(this.getData(this.URL, requestData));
    const data = this.getData(this.URL, requestData);
    return this.getItemsByHostId(data.result[0].hostid)
    
}
getItemsByHostId(hostId) {
  // Формируем данные запроса для получения элементов (items)
  const requestData = {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
          output: "extend",
          hostids: hostId
      },
      auth: this.API,
      id: 1
  };
  // console.log(requestData);
  const data = this.getData(this.URL, requestData);
  // console.log(data);
  return data.result;
}
  
  }
    