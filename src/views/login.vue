<template>
  <div id="login" class="flex_center">
    <div class="loginBox">
      <div class="imgBox">
        <img src="../../src/assets/校园.png" alt />
      </div>
      <div class="loginBox1">

        <h3 class="flex_center w_100 mb30">高校宿舍管理系统</h3>
        <!-- 登录 -->
        <el-form v-show="loginType" :model="ruleForm" :rules="rules" ref="ruleForm" label-width class="demo-ruleForm">
          <el-form-item label prop="user">
            <el-input v-model="ruleForm.user" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label prop="passWord">
            <el-input v-model="ruleForm.passWord" placeholder="密码" show-password></el-input>
          </el-form-item>
          <!-- <div class="flex_between mt10 mb20 fz16">
            <div class="pointer" style="color: #409eff" @click="register">注册</div>
            <div class="pointer" style="color: #409eff" @click="forget">忘记密码</div>
          </div> -->
          <div class="flex_center">
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { loginPort } from "../api/loginApi";
import '@/utils/index'
export default {
  name: "login",
  data() {
    return {
      backType: false,
      loginType: true,
      // fullscreenLoading: false, //登录提示状态
      ruleForm: {
        user: "001",
        passWord: "001"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 17, message: "长度在 2 到 17 个字符", trigger: "blur" }
        ],
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 17, message: "长度在 2 到 17 个字符", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 17, message: "长度在 2 到 17 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm.user, this.ruleForm.passWord);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let data = {
            userName: this.ruleForm.user,
            password: this.ruleForm.passWord
          };
          console.log(data);
          // loginPort(data).then(res=>{
          //   console.log(res)
          //   if(res.data.code==200){
          //     sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          //     this.$message({
          //       message: "恭喜你，登录成功",
          //       type: "success"
          //     });
          //     this.$router.push('/container')
          //   }
          // })
          const loading = this.$loading({
            lock: true,
            text: '登录中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          try {
            //登录的提醒
            // let res = await loginPort(data)
            // console.log(res)
            // if (res.data.code == 200) {
            //   loading.close();
            //   sessionStorage.setItem("userInfo", JSON.stringify(res.data.data[0].u_type));
            //   sessionStorage.setItem('token', res.data.token)
            //   this.$message({
            //     message: "恭喜你，登录成功",
            //     type: "success"
            //   });
            //   this.$router.push('/container')
            // }else if(res.data.data.length==0){
            //   loading.close();
            //   this.$message({
            //     message: "登录失败，账号密码错误!",
            //     type: "warning"
            //   });
            // }
            // console.log(data);
            this.$store.dispatch('login', data).then((res) => {
              console.log(res);
              loading.close();
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });
              this.$router.push('/container')

            }).catch((err) => {
              console.log(err);
              loading.close();
              this.$message({
                message: "登录失败，账号密码错误!",
                type: "warning"
              });
            })
            // console.log(this.$store.commit('login',data));




          } catch (error) {
            console.log(error);
          }


        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
html {
  font-size: 1rem;
}

#login {
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(
  //   to bottom right,
  //   rgb(102, 177, 255),
  //   rgb(217, 236, 255)
  // );
  background-image: linear-gradient(to bottom right, #7d49fe, #A37BFF);

  .loginBox {
    width: 70rem;
    padding: 5rem;
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 1);
    // box-shadow: 0rem 0rem 1rem rgb(217, 236, 255);
    border-radius: 1.5rem;

    .flex_center {
      font-size: 2.5rem;
      color: #727272;
    }
  }

  .el-button--primary {
    background: #A37BFF;
    border-color: #A37BFF;
    width: 100%;
  }

  .loginBox1 {
    width: 40%;
    position: relative;

    .backBtn {
      position: absolute;
      top: -2.2rem;
      left: 0;
      color: rgb(64, 158, 255);
      font-size: 2.2rem;
      font-weight: 900;
    }
  }

  .imgBox {
    width: 60%;

    img {
      margin-top: 2rem;
      width: 80%;
      border-radius: .5rem;
    }
  }
}
</style>
