<template>
  <div class="DataMan">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="date" label="时间" width="85">
      </el-table-column>
      <el-table-column align="center" prop="type" label="类型" width="80">
      </el-table-column>
      <el-table-column align="center" prop="describe" label="描述" width="160">
        <template slot-scope="scope">
          <span style="color: #5474c6">{{ scope.row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="文件地址"
        width="320"
      >
      </el-table-column>
      <el-table-column align="center" prop="size" label="文件大小" width="80">
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" width="110">
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        v-if="user.identity == 'VIP'"
      >
        <template slot-scope="scope">
          <el-button
            type="info"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-size="5"
            layout="total,prev, pager, next, jumper"
            :total="pagination.total"
            background
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <div class="btn_right">
      <el-button
        type="primary"
        size="small"
        icon="view"
        @click="handleAdd()"
        round
        v-if="user.identity == 'VIP'"
        >添 加</el-button
      >
    </div>
    <add-table :dialog="dialog" :form="form" @update="getProfile()"></add-table>
  </div>
</template>

<script>
import addTable from '../../components/addTable.vue';
export default {
  name: 'DataMan',

  data() {
    return {
      dialog: {
        show: false,
        title: '',
        option: 'edit',
      },
      form: {
        type: '',
        describe: '',
        address: '',
        size: '',
        remark: '',
        id: '',
      },
      tableData: [],
      allTableData: [],
      // 分页对象
      pagination: {
        currentPage: 1, //当前页
        total: 0, //多少条数据
      },
    };
  },
  // 权限判断 vip 游客
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.getProfile();
  },
  components: {
    addTable,
  },
  mounted() {},

  methods: {
    getProfile() {
      // 获取 Profile 数据
      this.$axios
        .get('/api/profiles')
        .then((res) => {
          res.data.forEach((item) => {
            let t = new Date(item.date);
            let FullYear = t.getFullYear();
            let Month = t.getMonth() + 1;
            let dat = t.getDate();
            let Hours = t.getHours();
            let Minutes = t.getMinutes();
            let time =
              FullYear +
              '-' +
              Month +
              '-' +
              dat +
              ' ' +
              Hours +
              '时' +
              Minutes +
              '分';
            item.date = time;
          });
          this.allTableData = res.data;
          // 设置分页数据
          this.setPagination();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页逻辑处理
    setPagination() {
      // 获取数据数组长度
      this.pagination.total = this.allTableData.length;

      // 设置默认分页数据,过滤让显示五条数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < 5;
      });
    },
    handleEdit(index, row) {
      //编辑信息
      console.log(row);
      this.dialog.show = true;
      this.dialog.title = '编辑数据';
      this.dialog.option = 'edit';

      this.form = {
        type: row.type,
        describe: row.describe,
        address: row.address,
        size: row.size,
        remark: row.remark,
        id: row._id,
      };
    },
    handleDelete(index, row) {
      //删除信息
      this.$axios
        .delete(`/api/profiles/delete/${row._id}`)
        .then((res) => {
          //   删除成功
          //   console.log(res);
          this.$message({
            message: '删除数据成功!',
            type: 'success',
          });
          this.getProfile();
        })
        .catch((err) => {
          // 删除失败
          this.$message({
            message: '删除数据失败!',
            type: 'success',
          });
        });
    },
    handleAdd() {
      //添加信息
      this.dialog.show = true;
      this.dialog.title = '添加数据';
      this.dialog.option = 'add';
      //清空点击编辑可能添加到 form 的信息
      this.form = {
        type: '',
        describe: '',
        address: '',
        size: '',
        remark: '',
        id: '',
      };
    },
    // 点击跳转到 xx 页
    handleCurrentChange(page) {
      // 获取当前页 page
      // console.log(page);
      // xx 页第一条数据下标
      let index = page * 5 - 5;
      // 数据总数 xx 页 * 5 等于从第一页第一条数据到第 xx 页最后一条数据
      let nums = page * 5;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables;
    },
  },
};
</script>

<style scoped>
.el-table {
  border-radius: 15px;
  overflow: hidden;
}
.btn_right {
  position: fixed;
  bottom: 3%;
  right: 43%;
  margin: 7px 15px;
}
.pagination {
  position: fixed;
  bottom: 3%;
  right: 5%;
  padding: 0 10px;
  height: 45px;
  border-radius: 23px;
  background: linear-gradient(145deg, #ffffff, #f1f3f6);
  box-shadow: 6px 6px 18px #c6c7ca, -6px -6px 18px #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>