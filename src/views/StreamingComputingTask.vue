<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">流式计算任务</el-header>
        </el-container>
        <div class="interface">
            <el-card class="resource-overview" >
                <div class="clearfix">
                <span>资源总览</span>
                </div>
                <el-card shadow="never" class="resource-inner">
                <div style="display:flex; justify-content: space-around; height: 200px;">
                    <div class="taskcount" style="height: 100px; top: 5%;" v-for="item in resource_overview_list" :key="item" >
                        <div style="font-size:medium; font-weight: bolder; margin-left: -15px;">
                        {{ item.name }}
                        </div>
                        <div style="color: dodgerblue; font-size: 60px; margin-top: 50px;" >
                        {{item.data}}
                        <span style="font-size: large;">个</span>
                        </div>
                    </div>
                    <div style="display:flex; justify-content: space-around;">
                        <div id="handling_capacity_total" style="width: 380px; height: 280px; margin-top: 0px; "></div>
                    </div>
                </div>
                </el-card>
            </el-card>
          <el-card class="node-list" style="display: inline-block;">
            <div class="wrapper">
              <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">添加节点</el-button> -->
              <span style="top: -10px; font-size: large;">流式计算任务列表</span>
              <el-button type="primary" icon="el-icon-refresh-right" @click="ReloadTask">重新执行</el-button>
            </div>
            <div class="table">
              <el-table :data="displayedData" stripe style="width: 100%">
                <el-table-column prop="name" label="节点名称" >
                  <!-- <template slot-scope="scope">
                      <el-button size="mini" type="text" @click="gotoNode(scope.row.name)">{{ scope.row.name }}</el-button>
                  </template> -->
                </el-table-column>
                <el-table-column prop="status" label="节点状态" width="350px">
                  <template slot-scope="scope">
                    <el-tag style="size:smaller"
                            :type="{
                                    'Running':'primary',
                                    'Loading':'warning',
                                    'Writing':'info',
                                    'Finished':'success'
                                }[scope.row.status]">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column prop="handlingcapacity" label="吞吐量" width="300px">
                  <template slot-scope="scope">
                    {{ scope.row.load }} Mbps
                  </template>
                </el-table-column>

              </el-table>
            </div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="datasize">
              </el-pagination>
            </div>
          </el-card>
            <el-card class="node-list" style="display: inline-block;">
                <div class="wrapper">
                    <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">添加节点</el-button> -->
                    <span style="top: -10px; font-size: large;">流式计算节点列表</span>
                    <el-button type="primary" icon="el-icon-refresh-right" @click="ReloadTask">重新执行</el-button>
                </div>
                <div class="table">
                    <el-table :data="displayedData" stripe style="width: 100%">
                        <el-table-column prop="name" label="节点名称" >
                            <!-- <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="gotoNode(scope.row.name)">{{ scope.row.name }}</el-button>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="status" label="节点状态" width="350px">
                            <template slot-scope="scope">
                                <el-tag style="size:smaller"
                                :type="{
                                    'Running':'primary',
                                    'Loading':'warning',
                                    'Writing':'info',
                                    'Finished':'success'
                                }[scope.row.status]">{{ scope.row.status }}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column prop="handlingcapacity" label="吞吐量" width="300px">
                            <template slot-scope="scope">
                                {{ scope.row.load }} Mbps
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="datasize">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            resource_overview_list:[{
                name:"任务节点数量",
                data:12
                }
            ],
            tableData: [
            {
                name:'k3s-master',
                status:'running',
                handlingcapacity:'150Mbps'
            }
            ],
            displayedData:[], //当页展示的数据
            pageSize:10,
            currentPage1:1, //当前页码
            datasize:0,
            speed:0,
            nodesnum:0
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        updateDisplayedData(){
            const startIndex = (this.currentPage1 - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.displayedData = this.tableData.slice(startIndex, endIndex);
        },
        toAddEdgeNode(){
            this.$router.push({
                name:'addnode'
            })
        },
        getNodeList(){
            this.$http.post('/flow/info').then(res=>{
                console.log(res)
                this.tableData = res.data.data.nodes
                this.datasize = res.data.data.nodes.length
                this.speed = res.data.data.total
                this.resource_overview_list[0].data = res.data.data.number
                this.updateDisplayedData()
            })
        },
        ReloadTask(){
            this.$http.post('/flow/reset').then(res=>{
                console.log(res)
            })
        },

        drawChart_handling_capacity_total(){
            let newPromise = new Promise((resolve) => {
                resolve()
            })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("handling_capacity_total"));
                let option = {
                title: {
                    text: "数据吞吐速率",
                    left: 'center',
                    top: '0px'
                },
                series: [
                    {
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 200,
                        splitNumber: 10,
                        itemStyle: {
                            color: '#58D9F9',
                            shadowColor: 'rgba(0,138,255,0.45)',
                            shadowBlur: 10,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        progress: {
                            show: true,
                            roundCap: true,
                            width: 10
                        },
                        pointer: {
                            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                            length: '70%',
                            width: 16,
                            offsetCenter: [0, '5%']
                        },
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                            width: 10
                            }
                        },
                        axisTick: {
                            splitNumber: 2,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        splitLine: {
                            length: 8,
                            lineStyle: {
                            width: 3,
                            color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 15,
                            color: '#999',
                            fontSize: 10
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            backgroundColor: '#fff',
                            borderColor: '#999',
                            borderWidth: 2,
                            width: '85%',
                            lineHeight: 40,
                            height: 40,
                            borderRadius: 8,
                            offsetCenter: [0, '40%'],
                            valueAnimation: true,
                            formatter: function (value) {
                            return '{value|' + value.toFixed(0) + '}{unit|Mbps}';
                            },
                            rich: {
                            value: {
                                fontSize: 20,
                                fontWeight: 'bolder',
                                color: '#777'
                            },
                            unit: {
                                fontSize: 14,
                                color: '#999',
                                padding: [0, 0, 0, 10]
                            }
                            }
                        },
                        data: [
                            {
                            value: this.speed
                            }
                        ]
                    }
                ]
                };
                option && myChart.setOption(option);
            })
        },
    },
    created(){
        this.getNodeList()
    },
    mounted() {
        setTimeout(() =>{
            // this.drawChart_nodes();
            // this.drawChart_load();
            this.drawChart_handling_capacity_total();
        },1000);
        this.timer_load = setInterval(this.getNodeList, 1000);
    },
    watch:{
      speed:{
        handler(newVal){
          console.log(newVal);
          //如果监听到了status的变化，那么就重新更新拓扑图，更新状态
          // console.log(this.edgeStatus[2])
          this.drawChart_handling_capacity_total()
        },
      }
    },
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  width:100%;
}

.resource-overview{
    position: relative;
  width: 96%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}

.resource-inner{
  position: relative;
  width: 96%;
  padding: 0px;
  margin-bottom: 10px;
  top:20px;
  left:2%;
  right: 2%;
}
.node-list{
    position: relative;
  width: 96%;
  padding: 10px;
  top:50px;
  left:2%;
  right: 2%;
  margin-bottom:5%;
  min-height: 800px;
}
.table{
    top:20px;
    margin-bottom: 40px;
    min-height: 600px;
}
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
