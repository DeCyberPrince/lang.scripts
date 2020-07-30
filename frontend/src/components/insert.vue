<template>
  <b-form @submit.prevent="download">
    <h1>Вставка</h1>
    <b-form-group label="«Неполноценный» перевод" label-for="needyTrans">
      <b-form-file
        v-model="needyTrans.file"
        :state="needyTrans.valid"
        accept="application/json"
        id="needyTrans"
        placeholder="Выберете json перевод"
      ></b-form-file>
    </b-form-group>
    <b-alert v-model="needyTrans.alert" variant="danger" fade> Не валидный JSON </b-alert>
    <b-form-group label="Переведенный кусочек" label-for="translatedPiece">
      <b-form-file
        v-model="transPiece.file"
        :state="transPiece.valid"
        accept="application/json"
        id="translatedPiece"
        placeholder="Выберете json перевод"
      ></b-form-file>
    </b-form-group>
    <b-alert v-model="transPiece.alert" variant="danger" fade> Не валидный JSON </b-alert>
    <b-button block variant="primary" type="submit" :disabled="isButtonDisabled">Скачать дополненный перевод</b-button>
  </b-form>
</template>

<script>
import { saveAs } from 'file-saver';
import $ from 'jquery';
export default {
  data() {
    return {
      needyTrans: {
        file: null,
        valid: null,
        alert: false
      },
      transPiece: {
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
      let merged = $.extend(true, this.needyTrans.text, this.transPiece.text);
      let stringified = JSON.stringify(merged, null, 2);
      let blob = new Blob([stringified], { type: 'application/json' });
      saveAs(blob, `Вставленный перевод.json`);
    }
  },
  computed: {
    isButtonDisabled() {
      return !this.needyTrans.valid || !this.transPiece.valid;
    }
  },
  watch: {
    needyTrans: {
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
    transPiece: {
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
