<template>
  <div class="addTable">
    <!-- <el-button type="text" @click="dialogFormVisible = true"
      >打开嵌套表单的 Dialog</el-button
    > -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          autocomplete="off"
          prop="describe"
        >
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item
          label="文件地址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件大小" :label-width="formLabelWidth">
          <el-input v-model="form.size" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="Onsubmit(form)">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addTable',
  props: {
    dialog: Object,
    form: Object,
  },
  data() {
    return {
      rules: {
        describe: [{ required: true, message: '请描述文件' }],
        address: [{ required: true, message: '请输入文件地址' }],
      },
      formLabelWidth: '80px',
    };
  },
  mounted() {},
  methods: {
    Onsubmit(arg) {
      const sub = this.dialog.option == 'add' ? 'add' : `edit/${this.form.id}`;

      this.$axios
        .post(`/api/profiles/${sub}`, this.form)
        .then((res) => {
          //   添加成功
          //   console.log(res);
          this.$message({
            message: `${this.dialog.title}成功!`,
            type: 'success',
          });
          this.$emit('update');
        })
        .catch((err) => {
          // 添加失败
          this.$message({
            message: `${this.dialog.title}成功!`,
            type: 'success',
          });
        });
      this.dialog.show = false;
      //   添加成功之后刷新,让父组件刷新
    },
  },
};
</script>

<style lang="scss" scoped>
</style>