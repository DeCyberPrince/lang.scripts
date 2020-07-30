<template>
  <b-form @submit.prevent="download">
    <h1>Извлечение</h1>
    <b-form-group
      label="Полный перевод"
      label-for="fullyTrans"
      v-b-tooltip.hover
      title="Перевод с большим количеством полей"
    >
      <b-form-file
        v-model="fullyTrans.file"
        :state="fullyTrans.valid"
        accept="application/json"
        id="fullyTrans"
        placeholder="Выберете json перевод"
      ></b-form-file>
    </b-form-group>
    <b-alert v-model="fullyTrans.alert" variant="danger" fade> Не валидный JSON </b-alert>
    <b-form-group
      label="«Неполноценный» перевод"
      label-for="nonFullyTrans"
      v-b-tooltip.hover
      title="Перевод с меньшим количеством полей"
    >
      <b-form-file
        v-model="nonFullyTrans.file"
        :state="nonFullyTrans.valid"
        accept="application/json"
        id="nonFullyTrans"
        placeholder="Выберете json перевод"
      ></b-form-file>
    </b-form-group>
    <b-alert v-model="nonFullyTrans.alert" variant="danger" fade> Не валидный JSON </b-alert>
    <b-button block variant="primary" type="submit" :disabled="isButtonDisabled">Скачать извлеченные различия</b-button>
  </b-form>
</template>

<script>
import { saveAs } from 'file-saver';
import extract from '@/extract.js';
export default {
  data() {
    return {
      fullyTrans: {
        file: null,
        valid: null,
        alert: false
      },
      nonFullyTrans: {
        file: null,
        valid: null,
        alert: false
      }
    };
  },
  methods: {
    getText(translate) {
      return translate ? translate.text() : undefined;
    },
    download() {
      let extracted = extract(this.fullyTrans.text, this.nonFullyTrans.text);
      let stringified = JSON.stringify(extracted, null, 2);
      let blob = new Blob([stringified], { type: 'application/json' });
      saveAs(blob, 'Непереведено.json');
    }
  },
  computed: {
    isButtonDisabled() {
      return !this.fullyTrans.valid || !this.nonFullyTrans.valid;
    }
  },
  watch: {
    fullyTrans: {
      handler(file) {
        if (!file.file) return;
        this.getText(file.file)
          .then(data => {
            file.text = JSON.parse(data);
            file.valid = true;
            file.alert = false;
          })
          .catch(() => {
            file.alert = true;
            file.valid = false;
          });
      },
      deep: true
    },
    nonFullyTrans: {
      handler(file) {
        if (!file.file) return;
        this.getText(file.file)
          .then(data => {
            file.text = JSON.parse(data);
            file.valid = true;
            file.alert = false;
          })
          .catch(() => {
            file.alert = true;
            file.valid = false;
          });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss"></style>
