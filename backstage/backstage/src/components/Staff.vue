<template>
  <div>

         

        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="用户"
        prop="id">
      </el-table-column>
      <el-table-column
        label="事件"
        prop="name">
      </el-table-column>
      <el-table-column
        label="内容"
        prop="detail">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="timestramp">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="add">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deletestaff(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="事件" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker
            v-model="form.timestramp"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editconfrim">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="addform.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件" :label-width="formLabelWidth">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="addform.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker
            v-model="addform.timestramp"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confrimadd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Staff',
   data() {
    return {
      tableData: [],
      search: '',
      editFormVisible: false,
      addFormVisible: false,
      form: {
        id:'',
        name:'',
        detail:'',
        timestramp:''
      },
      addform:{
        id:'',
        name:'',
        detail:'',
        timestramp:''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getstaff(){
      this.$http.post('http://120.77.249.23/getall_staff',{},{emulateJSON:true}).then(function(res){
        this.tableData = res.body   
      },function(res){
          console.log(res.status);
      });
    },
    edit(index){
      this.editFormVisible = true
      this.form = this.tableData[index]
      console.log(this.form)
    },
    editconfrim(){
      this.$http.post('http://120.77.249.23/edit_staff',{id:this.form.id,name:this.form.name,detail:this.form.detail,timestramp:this.form.timestramp},{emulateJSON:true}).then(function(res){
        this.getstaff()
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
      },function(res){
          console.log(res.status);
      });
      this.editFormVisible = false
      },
    deletestaff(index){
      console.log(this.tableData[index].id);
      this.$http.post('http://120.77.249.23/delete_staff',{id:this.tableData[index].id,name:this.tableData[index].name},{emulateJSON:true}).then(function(res){
        this.getstaff()
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      },function(res){
          console.log(res.status);
      });
    },
    add(){
      this.addFormVisible = true
    },
    confrimadd(){
      this.$http.post('http://120.77.249.23/add_staff',{id:this.addform.id,name:this.addform.name,detail:this.addform.detail,timestramp:this.addform.timestramp},{emulateJSON:true}).then(function(res){
        this.getstaff()  
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.addFormVisible =false;
        this.addform = {
          id:'',
          name:'',
          detail:'',
          timestramp:''
        }
      },function(res){
          console.log(res.status);
      });
    }
  },
  created(){
    this.getstaff()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
