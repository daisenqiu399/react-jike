import BarChart from '@/components/BarChart';
const Home=()=>{
    return <div>
        <BarChart title={'三大框架满意度'} data={[1,2,3]}/>
        <BarChart title={'三大框架使用度'} data={[5,6,3]}/>
         </div>
}
export default Home