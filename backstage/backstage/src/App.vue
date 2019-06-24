<template>
  <div id="app">
    <el-container>
      <div v-for="(index,billDate) in BillListDivided" :key="index">
        {{billDate}}
        
        <div v-for="value in index" :key="value">
          {{value}}
        </div>
      </div>
      <el-header>
        <el-menu
          :default-active="index"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router=""
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" route="/">事务管理</el-menu-item>
          <el-menu-item index="2" route="/Diary">日记管理</el-menu-item>
          <el-menu-item index="3" route="/Account">记账管理 </el-menu-item>
          <el-menu-item index="4" route="/Contact">通讯录管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
         <router-view></router-view>
    
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      index:'1',
      BillListDivided: {
          '2019/06/21': [{
          showMore: false,
          billReason: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
          billCost: '20',
          billCreate: '12:30'
          },{
          showMore: false,
          billReason: '午饭',
          billCost: '-20',
          billCreate: '12:40'
          }],
          '2019/06/22': [{
          showMore: false,
          billReason: '午饭',
          billCost: '-20',
          billCreate: '12:50'
          },{
          showMore: false,
          billReason: '午饭',
          billCost: '-20',
          billCreate: '11:30'
          }]
          }
    }
  },
  methods:{
    handleSelect(key, keyPath){
        console.log(key, keyPath);
      }
  }
}
</script>

<style>
  .el-header {
    background-color:#545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%
  }
  
  
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
