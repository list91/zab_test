import Auth from "./auth.js";

        function processTableData(tableData) {
          if (!tableData || tableData.length === 0) {
            return [];
          }

          const intermediatePointsCount = 17;

          const dataPointsCount = tableData.length;

          const step = Math.floor(dataPointsCount / (intermediatePointsCount + 1));

          const intermediatePoints = [];

          for (let i = 1; i <= intermediatePointsCount; i++) {
            const index = i * step - 1;
            intermediatePoints.push(tableData[index]);
          }

          return intermediatePoints;
        }
        function convertTimestampToReadableDate(timestamp) {
          const date = new Date(timestamp * 1000); // Умножаем на 1000, так как JavaScript ожидает миллисекунды
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2); // Добавляем 1, так как месяцы в JavaScript начинаются с 0
          const day = ('0' + date.getDate()).slice(-2);
          const hours = ('0' + date.getHours()).slice(-2);
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const seconds = ('0' + date.getSeconds()).slice(-2);
        
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        function get_datatime_list(list){
          let new_list = []
          for (let index = 0; index < list.length; index++) {
            new_list.push(convertTimestampToReadableDate(list[index]))
          }
          return new_list;
        }
        const apiUrl = 'http://192.168.0.160/zabbix/api_jsonrpc.php';
        const auth = new Auth(apiUrl, "Admin", "zabbix");
        function main() {
          var arr = auth.getAllItems(auth.API, "46600");
          // 46600 наш тест 42261
          var series_list = []
          var labels_list = []

          for (let index = 0; index < arr.length; index++) {
              series_list.push(arr[index]["value"]);
              labels_list.push(arr[index]["clock"]);
          }
          var data = {
            labels: get_datatime_list(processTableData(labels_list)),
            series: [processTableData(series_list)]
        }
          new Chartist.Line('.ct-chart-1', data);
        }

        setInterval(main, 1000)