export default class DataInterface {
    constructor(authClass, itemClass) {
        this.ITEM = itemClass;
        this.AUTH = authClass;
    }
    generate_class_name() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
        let result = '';
    
        for (let i = 0; i < 35; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
    
        return result;
    }

    processTableData(tableData) {
        if (!tableData || tableData.length === 0) {
          return [];
        }

        const intermediatePointsCount = 14;

        const dataPointsCount = tableData.length;

        const step = Math.floor(dataPointsCount / (intermediatePointsCount + 1));

        const intermediatePoints = [];

        for (let i = 1; i <= intermediatePointsCount; i++) {
          const index = i * step - 1;
          intermediatePoints.push(tableData[index]);
        }

        return intermediatePoints;
      }
      
      convertTimestampToReadableDate(timestamp) {
        const date = new Date(timestamp * 1000); // Умножаем на 1000, так как JavaScript ожидает миллисекунды
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Добавляем 1, так как месяцы в JavaScript начинаются с 0
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      createInterfaceParams(){
        let params_block = document.createElement("div");
        
      }
}