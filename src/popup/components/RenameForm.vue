<template>
  <el-form ref="form" :model="form" :rules="rules" size="small">
    <el-form-item label="Renaming:">
      <el-input :value="group" disabled />
    </el-form-item>

    <el-form-item label="New group:" prop="group">
      <el-input v-model.trim="form.group" />
    </el-form-item>

    <el-form-item>
      <el-button
        :disabled="form.group && form.group === group"
        type="primary"
        class="mt-2"
        @click="submit"
      >
        Update
      </el-button>

      <router-link to="/" class="inline-block">
        <el-button>Cancel</el-button>
      </router-link>
    </el-form-item>

    <small class="italic text-gray-600">
      <i class="el-icon-lock" />
      This data is stored on your computer.
      We DO NOT collect them or using them for other purposes.
    </small>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form'; // eslint-disable-line
import { Component, Vue, Prop } from 'vue-property-decorator';

interface RenameFormData {
  group?: string;
}

@Component
export default class RenameForm extends Vue {
  @Prop({ required: true })
  group!: string;

  form: RenameFormData = {};

  rules: object = {
    group: [
      { required: true, message: 'Group is required' },
    ],
  };

  submit() {
    // @ts-ignore
    const { form }: { form: ElForm } = this.$refs;

    if (!form) return;

    form.validate((valid) => {
      if (valid) {
        this.$emit('submit', this.form);
      }
    });
  }
}
</script>
