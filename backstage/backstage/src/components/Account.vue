<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="用户"
      width="">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收入"
      width="">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
              
            <el-tag size="medium" type="success"><i class="el-icon-bottom"></i>{{ scope.row.income }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="支出"
      width="">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="warning"><i class="el-icon-top"></i>{{ scope.row.outcome }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="总计"
      width="">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="">{{ scope.row.Total }}</el-tag>
          </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getacccount(){
        this.$http.post('http://120.77.249.23/get_acounnt',{},{emulateJSON:true}).then(function(res){
            this.tableData = res.body 
            console.log(this.tableData)  
        },function(res){
            console.log(res.status);
        });
        },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
        this.getacccount()
    }
  }
</script>