import React, {Component} from 'react'
import './index.scss'
import echarts from 'echarts'


class Leavework extends Component{
    constructor(props){
        super(props)
    }
    state={
        option:{
            title: {
                text: '工资收入'
            },
            tooltip: {},
            grid:{
                left:50,
                x:45
            },
            xAxis: {
                axisTick: { length:15 },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {},
            series: [{
                name: '工资',
                type: 'bar',
                barGap:5,
                barWidth:30,
                data: [5100, 2065, 3634, 6500, 10235, 5100, 2065, 3634, 6500, 10235, 6500, 10235]
            }]  
        }
    }
    render(){
        return (
            <div className="leavework">
                <div ref={el => this.el = el} className="content"></div>
            </div>
        )
    }
    componentDidMount() {
       
        this.chart = echarts.init(this.el)
        this.chart.setOption(this.state.option,true)
    }
}
export default Leavework