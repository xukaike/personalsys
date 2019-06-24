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
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>
      <el-table-column
        label="号码"
        prop="number">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address">
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
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="号码" :label-width="formLabelWidth">
          <el-input v-model="form.number"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"  autocomplete="off"></el-input>
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
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="号码" :label-width="formLabelWidth">
          <el-input v-model="form.number"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"  autocomplete="off"></el-input>
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
        intro:'',
        timestramp:''
      },
      addform:{
        id:'',
        name:'',
        intro:'',
        timestramp:''
      },
      formLabelWidth: '120px'
    }
  }
  ,
  methods: {
    getstaff(){
      this.$http.post('http://120.77.249.23/getall_contact',{},{emulateJSON:true}).then(function(res){
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
      this.$http.post('http://120.77.249.23/edit_contact',{id:this.form.id,name:this.form.name,email:this.form.email,number:this.form.number,address:this.form.address},{emulateJSON:true}).then(function(res){
        this.getstaff()
        console.log(this.form)
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
      this.$http.post('http://120.77.249.23/delete_contact',{id:this.tableData[index].id,name:this.tableData[index].name},{emulateJSON:true}).then(function(res){
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
      this.$http.post('http://120.77.249.23/add_contact',{id:this.form.id,name:this.form.name,email:this.form.email,number:this.form.number,address:this.form.address},{emulateJSON:true}).then(function(res){
        this.getstaff()  
        console.log(this.addform)
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.addFormVisible =false;
        this.addform = {
          id:'',
          name:'',
          intro:'',
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