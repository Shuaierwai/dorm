<template>
    <div class="viewDormSubcomponents">
        <el-dialog title="查看寝室" :visible="dialogViewDormFormVisible" @close="closeDialogViewDormBtn">
            <el-form :model="form">
                <el-form-item label="寝室编号" :label-width="formLabelWidth" prop="DormNum">
                    <el-input v-model="form.DormNum" autocomplete="off" placeholder="请输入寝室的编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="寝室名字" :label-width="formLabelWidth" prop="DormName">
                    <el-input v-model="form.DormName" autocomplete="off" placeholder="请输入寝室的名字" disabled></el-input>
                </el-form-item>
                <el-form-item label="寝室余额" :label-width="formLabelWidth" prop="money">
                    <el-input v-model="form.money" autocomplete="off" placeholder="请输入寝室的金额" disabled></el-input>
                </el-form-item>
                <el-form-item label="寝室状态" :label-width="formLabelWidth" prop="dormState">
                    <el-input v-model="form.dormState" autocomplete="off" placeholder="请输入寝室状态" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialogViewDormBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { watch } from 'vue'
export default {
    name:'viewDormSub',
    props: ['dialogViewDormFormVisible','viewList'],
    data() {
        return {
            form: {
                DormNum: '',
                DormName: '',
                money: 0,
                dormState: '正常',
            },
            formLabelWidth: '9rem',

        }
    },



    methods: {
        closeDialogViewDormBtn() {
            this.$emit('closeDialogViewDormBtn')
           
        },

        //正则验证完确定添加
        
    },
    watch:{
        viewList:{
            handler(){
               console.log(this.viewList);

               this.form.DormName=this.viewList.d_name;
               this.form.DormNum=this.viewList.d_num;
               this.form.money=this.viewList.d_money;
               this.form.dormState=this.viewList.d_state;
            }
        },
        deep:true,
        immediate: true,
    }
}

</script>

<style>

</style>