<template>
  <el-form ref="form" :model="form" :rules="rules" size="small">
    <el-form-item label="Site URL:" prop="url">
      <el-input v-model="form.url" placeholder="https://..." @change="onChangeURL" />
    </el-form-item>

    <el-form-item label="Site Name:" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Group:" prop="group">
      <el-input v-model="form.group" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">
        {{ site ? 'Update' : 'Add site' }}
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
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _isString from 'lodash/isString';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { GET_PAGE_INFO } from '@/types';
import { ElForm } from 'element-ui/types/form'; // eslint-disable-line

interface SiteFormData {
  url?: string;
  name?: string;
  group?: string;
}

interface Location {
  host: string;
  origin: string;
}

const isURL = (rule: any, value: any, callback: Function) => {
  // eslint-disable-next-line
  if (_isString(value) && !/^(http[s]?:\/\/(?:www\.)?[a-z0-9-\.\:]+)/.test(value)) {
    return callback(new Error('Invalid URL'));
  }

  return callback();
};

const rules: object = {
  url: [
    { required: true, message: 'Site URL can not be blank' },
    { validator: isURL, message: 'Site URL is invalid' },
  ],
  name: [
    { required: true, message: 'Site Name is required' },
  ],
  group: [
    { required: true, message: 'Group is required' },
  ],
};

const parseURL = (token: string): { host: string; origin: string } | null => {
  // eslint-disable-next-line
  const matched: RegExpMatchArray | null = token.match(/^(http[s]?:\/\/((?:www\.)?[a-z0-9-\.\:]+))/i);

  if (!matched) return null;

  return {
    host: matched[2],
    origin: matched[1],
  };
};

@Component
export default class SiteForm extends Vue {
  @Prop()
  site!: SiteFormData;

  form: SiteFormData = {};

  location!: Location | null;

  rules: object = rules;

  get isHttps(): boolean {
    const detectedProtocol = _get(this.location, 'protocol', 'https:');

    return detectedProtocol === 'https:';
  }

  beforeMount() {
    if (!this.site) {
      this.fetchNewSiteInfo();
    } else {
      this.form = _assign({}, this.site);
    }
  }

  fetchNewSiteInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabID = _get(tabs, '0.id');
      const message = { command: GET_PAGE_INFO };

      chrome.tabs.sendMessage(currentTabID, message, (response) => {
        const location: Location | null = _get(response, 'location');

        if (location) {
          this.fillData(location);
        }
      });
    });
  }

  fillData(location: Location) {
    const { host, origin } = location;

    this.form = _assign({}, this.form, {
      host,
      name: host,
      group: host,
      url: origin,
    });
  }

  onChangeURL(token: string) {
    const location = parseURL(token);

    if (!location) return;

    this.fillData(location);
  }

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
