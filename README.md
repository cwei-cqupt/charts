# charts
用法：

    new Chart{
       isinit:boolean,//非必需默认为true
       id:html_id,
       canvasInit:{
         width:canvasWidth,//默认为300
         height:canvasHeight,//默认为200
         orionXY:{             //必需 图标左上右下坐标
            startX:40,
            startY:20,
            endX:500,
            endY:270
          },
         //not important 默认为 title:"cgzs" fontsize:"16px Georgia" titlestyle:black
         title:{
          fontSize:"20px Georgia",
          titleStyle:"#ff0033"
         }
        }
        //not important 默认为form形式 bgc：白色 坐标轴：黑色
      form:{
          formStyle:"form"
      },
      //important
      chart:{
          lineCap:"round",
          chartStyle:'line',
          lineWidth:2,
          lineColor:'#ff0033',
      isAvg:true,
      data:arr
      }
    }
