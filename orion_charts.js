/**
 * Created by lenovo on 2016/4/14.
 */
function OrionChart(object){
    this.id = object.id;
    this.obj = document.getElementById(this.id);
    this.chart = object.chart.chartStyle;
    this.title = object.canvasInit.title?object.canvasInit.title.name?object.canvasInit.title.name:" ":{
        name:" ",
        titleStyle:"#000000",
        fontSize:"16px Georgia"
    };
    var ctx = this.obj.getContext('2d');
    this.canvasInit = function(obj,object){
        var titleStyle = this.title.titleStyle;
        var titleFont = this.title.fontSize;
        obj.width = object.canvasInit.width?object.canvasInit.width:300;
        obj.height = object.canvasInit.height?object.canvasInit.height:200;
        var orion = object.canvasInit.orionXY;
        ctx.beginPath();
        ctx.font = titleFont;
        ctx.fillStyle = titleStyle;
        ctx.fillText(this.title,orion.startX+(orion.endX-orion.startX-this.title.length*parseInt(titleFont))/2,orion.startY-3);
    };
    this.drawXOY = function(object){
        var orion = object.canvasInit.orionXY;
        var form = object.form||{
                formBGC:"#ffffff",
                formColor:"#cccccc"
            };
        ctx.beginPath();
        ctx.fillStyle = form.formBGC||"#ffffff";
        ctx.strokeStyle = form.formColor||"#cccccc";
        ctx.fillRect(orion.startX,orion.startY,orion.endX-orion.startX,orion.endY-orion.startY);
        ctx.moveTo(orion.startX+0.5,orion.startY-0.5);
        ctx.lineTo(orion.startX+0.5,orion.endY-0.5);
        ctx.lineTo(orion.endX+0.5,orion.endY-0.5);
        ctx.stroke();
        ctx.closePath();
    };
    this.drawForm = function(object){
        var orion = object.canvasInit.orionXY;
        var form = object.form||{
                formBGC:"#ffffff",
                formColor:"#cccccc"
            };
        ctx.beginPath();
        ctx.fillStyle = form.formBGC||"#ffffff";
        ctx.strokeStyle = form.formColor||"#cccccc";
        ctx.fillRect(orion.startX,orion.startY,orion.endX-orion.startX,orion.endY-orion.startY);
        for(var i = 1;i < 5;i++){
            ctx.moveTo(orion.startX-0.5+i*(orion.endX-orion.startX)/5,orion.startY);
            ctx.lineTo(orion.startX-0.5+i*(orion.endX-orion.startX)/5   ,orion.endY);
            ctx.stroke();
        }
        for(i = 0;i < 7;i++){
            ctx.moveTo(orion.startX,orion.startY-0.5+Math.ceil(i*(orion.endY-orion.startY)/6));
            ctx.lineTo(orion.endX,orion.startY-0.5+Math.ceil(i*(orion.endY-orion.startY)/6));
            ctx.stroke();
        }
    };
    this.drawLineXY = function(data,object){
        ctx.beginPath();
        ctx.lineCap = object.chart.lineCap;
        ctx.lineWidth = object.chart.lineWidth;
        ctx.strokeStyle = object.chart.lineColor;
        ctx.moveTo(data[0][0],data[0][1]);
        for(var i = 1;i < data.length-1;i++){
            ctx.lineTo(data[i][0],data[i][1]);
        }
        ctx.lineTo(data[data.length-1][0],data[data.length-1][1]);
        ctx.stroke();
        ctx.closePath();
    };
    this.drawLineAvg = function(data,object){
        var orion = object.canvasInit.orionXY;
        var height = orion.endY-orion.startY;
        ctx.beginPath();
        ctx.lineWidth = object.chart.lineWidth;
        ctx.strokeStyle = object.chart.lineColor;
        ctx.moveTo(orion.startX,orion.startY+height*(1-data[0]));
        for(var i = 1;i < data.length-1;i++){
            ctx.lineTo(orion.startX+i*(orion.endX-orion.startX)/(data.length-1),orion.startY+height*(1-data[i]));
            console.log(orion.startX+i*(orion.endX-orion.startX)/(data.length-1))
        }
        ctx.lineTo(orion.endX,orion.startY+height*(1-data[data.length-1]));
        ctx.stroke();
        ctx.closePath();
    };
    var that = this;
    if(object.init){
        ~function(that){
            that.canvasInit(that.obj,object);
            try{
                switch(object.form.formStyle){
                    case "xoy":
                        that.drawXOY(object);
                        break;
                    case "form":
                        that.drawForm(object);
                        break;
                }
            }catch (e){
                that.drawForm(object);
            }
            if(object.chart.isAvg) {
                that.drawLineAvg(object.chart.data,object);
            }else{
                that.drawLineXY(object.chart.data,object);
            }
        }(that);
    }
}