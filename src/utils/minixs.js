//把公共的分页功能取出来，复用行
let mixins = {
  data: function () {
    return {
      currentPage: 1,
      count: 5,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.count = val;
      this.render()
     console.log(this.count)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
       this.render()
    },
  },
};

export default mixins
