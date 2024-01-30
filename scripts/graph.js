import DataInterface from "./data_interface.js";
export default class Graph extends DataInterface {
    constructor(auth, item, from, to){
        super(auth, item);
        this.ID_ITEM = item.ID;
        this.update_from_to(from, to)
        this.create_graph_block();
    }
    create_graph_block(){
        this.GRAPH_DIV = document.createElement("div");
        
        while(1){
            let class_name = this.generate_class_name();
            if (document.getElementsByClassName(class_name).length == 0){
                this.CLASS_NAME = class_name;
                break;
            }
        }

        const graph = document.createElement("div");
        graph.classList.add(this.CLASS_NAME);
        
        graph.classList.add("graph");

        let header_graph_block = document.createElement("div");
        header_graph_block.classList.add("header_graph_block");
        
        let header_graph_block__title = document.createElement("div");
        header_graph_block__title.textContent = "Заголовок"
        header_graph_block__title.classList.add("header_graph_block__title");

        let header_graph_block__buttons_block = document.createElement("div");
        header_graph_block__buttons_block.classList.add("header_graph_block__buttons_block");

        let header_graph_block__buttons_block__btn_conf = document.createElement("div");
        header_graph_block__buttons_block__btn_conf.classList.add("header_graph_block__buttons_block__btn_conf");

        let header_graph_block__buttons_block__btn_wdg = document.createElement("div");
        header_graph_block__buttons_block__btn_wdg.classList.add("header_graph_block__buttons_block__btn_wdg");
        
        let btn_conf = document.createElement("button");
        btn_conf.classList.add("btn_conf");
        let btn_conf_menu = document.createElement("div");
        btn_conf_menu.classList.add("btn_conf_menu");
        btn_conf_menu.textContent = "приветekjrrejtirjeiotjrieojtiorejtoijreotjorektpoertoijreiotjieojtwoipejrwitjreijfirojoif"
        btn_conf.addEventListener("click", function() {

        });
        

        let btn_wdg = document.createElement("button");
        btn_wdg.classList.add("btn_wdg");
        
        let svg_gear = document.createElement("img");
        svg_gear.classList.add("button_graph");
        svg_gear.src = 'img/1336392323.svg';
        svg_gear.height = 100;
        svg_gear.width = 100;
        
        let img_wdg = document.createElement("img");
        img_wdg.classList.add("button_graph");
        img_wdg.src = 'img/icons8-ellipsis-48.png';
        img_wdg.height = 100;
        img_wdg.width = 100;

        this.GRAPH_DIV.appendChild(header_graph_block);
        this.GRAPH_DIV.appendChild(graph);

        header_graph_block.appendChild(header_graph_block__title);
        // header_graph_block.appendChild(header_graph_block__buttons_block);

        header_graph_block__buttons_block.appendChild(btn_conf_menu);
        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_conf);
        header_graph_block__buttons_block.appendChild(header_graph_block__buttons_block__btn_wdg);

        header_graph_block__buttons_block__btn_conf.appendChild(btn_conf);
        btn_conf.appendChild(svg_gear);

        header_graph_block__buttons_block__btn_wdg.appendChild(btn_wdg);
        btn_wdg.appendChild(img_wdg);
        let gc = document.createElement("div");
        gc.id = "graph_container";
        gc.appendChild(this.GRAPH_DIV);
        this.push_form_mainContent();
        // alert(this.MAIN_CONTAINER);
        this.MAIN_CONTAINER.appendChild(gc);

    }

    cancel_runprocess(){
        clearInterval(this.UPDATE_TASK_ID);
    }
    run_display_graph(interval){
        this.UPDATE_TASK_ID = setInterval(
            ()=>{
                this.update_display_graph(this.CLASS_NAME)
            },
            interval
        );
    }
    update_from_to(from, to){
        this.from = from;
        this.to = to;
    }


    udate_array(){
        this.ARRAY_LONG = this.AUTH.getItemsTimeInterval(this.ID_ITEM, this.from, this.to);
    }

    update_display_graph(){

        this.udate_array();

        var series_list = []
        var labels_list = []

        // console.log(this.ARRAY_LONG);

        if (this.ARRAY_LONG) {
            console.log(this.ARRAY_LONG);
            for (let index = 0; index < this.ARRAY_LONG.length; index++) {
                series_list.push(this.ARRAY_LONG[index]["value"]);
                labels_list.push(new Date(this.ARRAY_LONG[index]["clock"]*1000).toISOString());
                // console.log(new Date(this.ARRAY_LONG[index]["clock"]*1000).toISOString());
            }
        }

        var data = {
            labels: this.AUTH.processTableData(labels_list),
            series: [this.AUTH.processTableData(series_list)]
        }
        // console.log(data)
        var defaultOptions = {
            // Options for X-Axis
            axisX: {
              // The offset of the labels to the chart area
              offset: 80,
              // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
              position: 'end',
              // Allows you to correct label positioning on this axis by positive or negative x and y offset.
              labelOffset: {
                x: 10,
                y: 0
              },
              // If labels should be shown or not
              showLabel: true,
              // If the axis grid should be drawn or not
              showGrid: true,
              // Interpolation function that allows you to intercept the value from the axis label
              labelInterpolationFnc: Chartist.noop,
              // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
              type: undefined
            },
            // Options for Y-Axis
            axisY: {
              // The offset of the labels to the chart area
              offset: 80,
              // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
              position: 'start',
              // Allows you to correct label positioning on this axis by positive or negative x and y offset.
              labelOffset: {
                x: 0,
                y: 10
              },
              // If labels should be shown or not
              showLabel: true,
              // If the axis grid should be drawn or not
              showGrid: true,
              // Interpolation function that allows you to intercept the value from the axis label
              labelInterpolationFnc: Chartist.noop,
              // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
              type: undefined,
              // This value specifies the minimum height in pixel of the scale steps
              scaleMinSpace: 20,
              // Use only integer values (whole numbers) for the scale steps
              onlyInteger: false
            },
            // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
            width: undefined,
            // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
            height: undefined,
            // If the line should be drawn or not
            showLine: true,
            // If dots should be drawn or not
            showPoint: true,
            // If the line chart should draw an area
            showArea: false,
            // The base for the area chart that will be used to close the area shape (is normally 0)
            areaBase: 0,
            // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
            lineSmooth: false,
            // If the line chart should add a background fill to the .ct-grids group.
            showGridBackground: false,
            // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
            low: undefined,
            // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
            high: undefined,
            // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
            chartPadding: {
              top: 15,
              right: 15,
              bottom: 5,
              left: 10
            },
            // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
            fullWidth: false,
            // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            reverseData: false,
            // Override the class names that get used to generate the SVG structure of the chart
            classNames: {
              chart: 'ct-chart-line',
              label: 'ct-label',
              labelGroup: 'ct-labels',
              series: 'ct-series',
              line: 'ct-line',
              point: 'ct-point',
              area: 'ct-area',
              grid: 'ct-grid',
              gridGroup: 'ct-grids',
              gridBackground: 'ct-grid-background',
              vertical: 'ct-vertical',
              horizontal: 'ct-horizontal',
              start: 'ct-start',
              end: 'ct-end'
            }
          };
//           var options = {
//   lineSmooth: Chartist.Interpolation.cardinal({
//     tension: 0.1
//   })
// };

        // document.getElementsByClassName("header_graph_block__title")[0].textContent =

        new Chartist.Line("."+this.CLASS_NAME, data, defaultOptions);
    }

}