//柱状图组件
import Title from 'antd/es/skeleton/Title';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
//把功能代码都放到这个组件

//把可变的部分抽象成prop参数

const BarChart=({title})=>{
const charRef=useRef(null)
 useEffect(()=>{
        //获取渲染图标的dom节点
const  chartDom = charRef.current
const myChart = echarts.init(chartDom); 

const option = {
  title:{
  text:title,
  },
  xAxis: {
    type: 'category',
    data: ['vue', 'Reac', 'Angul']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200,150],
      type: 'bar'
    }
  ]
};

option && myChart.setOption(option);
    },[])
    return <div ref={charRef} style={{width:'500px',height:'500px'}}></div>
}

export default BarChart