import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';



const Home=()=>{
    const charRef=useRef(null)
    useEffect(()=>{
        //获取渲染图标的dom节点
const  chartDom = charRef.current
const myChart = echarts.init(chartDom); 

const option = {
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
    })
    return <div ref={charRef} style={{width:'500px',height:'500px'}}></div>
}
export default Home