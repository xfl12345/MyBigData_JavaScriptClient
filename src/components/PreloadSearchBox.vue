<template>
  <div ref="templateRoot" class="templateRootStyle" @mouseenter="enterArea" @mouseleave="leaveArea">
    <div style="flex-grow: 1; display: flex; flex-direction: column">
      <div class="searchBox">
        <input ref="inputArea" v-model="searchValue" class="inputArea" placeholder="请输入前缀" />
        <button class="searchButton">搜索</button>
      </div>

      <!--<br />-->
      <div v-for="(item, key) in resultList" :key="key" class="divTest">{{ item }}</div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
import { plainToClass, plainToInstance } from "class-transformer";

import JsonApiData from "../po/JsonApiData";
import { isStringNumeric } from "../utils/IsNumeric";

export default defineComponent({
  name: "PreloadSearchBox",
  setup() {
    const templateRoot = ref<HTMLDivElement>();
    const inputArea = ref<HTMLTextAreaElement>();
    return {
      templateRoot,
      inputArea
    };
  },
  data() {
    return {
      searchValue: "",
      borderRadius: "30px",
      resultList: [] as any[]
    };
  },
  watch: {
    searchValue(inputValue, oldValue) {
      const myself = this;
      if (inputValue === "") {
        myself.resultList = [];
        return;
      }

      let searchDataType;

      if (inputValue instanceof Number) {
        searchDataType = "number";
        console.log("Yes.It is number!");
      } else if (isStringNumeric(inputValue)) {
        searchDataType = "number";
      } else {
        searchDataType = "string";
      }

      axios.get(`./backend/search/${searchDataType}/by-prefix/` + myself.searchValue).then((response) => {
        // const jsonApiData: JsonApiData = plainToInstance(JsonApiData, response.data);
        const jsonApiData: JsonApiData = response.data;
        console.log(jsonApiData);
        if (jsonApiData.data instanceof Array) {
          myself.resultList = jsonApiData.data;
        }
      });
    }
  },
  methods: {
    enterArea(event: MouseEvent) {
      console.log("Entered!");
    },
    leaveArea(event: MouseEvent) {
      console.log("Left!");
    }
  }
});
</script>

<style scoped>
.templateRootStyle {
  width: 100%;
  height: 400px;

  box-sizing: border-box;

  border: deepskyblue solid;
  border-radius: v-bind(borderRadius);
  padding: v-bind(borderRadius);

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  overflow: hidden;
}

.searchBox {
  display: flex;
  flex-direction: row;
}

.searchButton {
  flex-basis: content;

  border: none;
  resize: none;
  outline: none;
}

.inputArea {
  flex-basis: 50px;
  flex-grow: 1;

  /*width: 100%;*/
  padding: 0;
  /*border: none;*/
  resize: none;
  outline: none;

  background-color: transparent;

  /*display: block;*/
}

.divTest {
  flex-grow: 1;
}
</style>
