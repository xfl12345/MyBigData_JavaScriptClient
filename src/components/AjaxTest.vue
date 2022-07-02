<template>
  <div>
    <div class="jsInsert" style="border-style: solid; word-wrap: break-word">{{ jsInsertContent }}</div>
    <br />
    <br />
    <div ref="formTable">
      <div>
        requestMethod:<br />
        <label for="requestMethod">
          <input ref="requestMethod" class="jsInsert" type="text" />
        </label>
      </div>
      <div>
        requestURL:<br />
        <label for="requestURL">
          <input ref="requestURL" class="jsInsert" type="text" />
        </label>
      </div>
      <br />
      <br />
      <div>
        requsetInput:<br />
        <textarea
          ref="requestInput"
          class="jsInsert"
          type="text"
          style="width: 100%; height: 500px"
        ></textarea>
      </div>
    </div>
    <br />
    <br />
    <button ref="btn1" class="mySubmitBtn" style="width: auto" @onclick="postForm">发送请求</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { isString } from "is-what";
import { ajax } from "../utils/ajax_util";

export default defineComponent({
  name: "AjaxTest",
  setup() {
    const requestInput = ref<HTMLInputElement>();
    const requestURL = ref<HTMLInputElement>();
    const requestMethod = ref<HTMLInputElement>();
    const btn1 = ref<HTMLButtonElement>();
    return {
      requestInput,
      requestURL,
      requestMethod,
      btn1
    };
  },
  data() {
    return {
      jsInsertContent: ""
    };
  },
  methods: {
    getDomStringValue(htmlElement: HTMLElement | undefined): string {
      if (typeof htmlElement === "undefined") {
        throw Error("Can not get value from undefined.");
      }

      const defaultResult = "";
      let tmpVal: any;
      if (htmlElement instanceof HTMLInputElement) {
        tmpVal = htmlElement.value;
      } else if (htmlElement instanceof HTMLElement) {
        tmpVal = htmlElement.innerText;
      }

      return isString(tmpVal) ? tmpVal : defaultResult;
    },
    postForm() {
      const myself = this;
      const jsonData = myself.getDomStringValue(myself.requestInput);
      ajax({
        url: myself.getDomStringValue(myself.requestURL),
        type: myself.getDomStringValue(myself.requestMethod),
        data: jsonData,
        timeout: 50000, // 5秒超时
        contentType: "application/json;charset=utf-8",
        ontimeout: (event) => {
          console.log(event);
          myself.jsInsertContent = "请求超时。";
        }
      }).then(
        (xhr: XMLHttpRequest) => {
          const recvData = xhr.responseText;
          console.log(recvData);
          // 服务器返回响应，根据响应结果，分析是否请求成功
          const testJsonStr = '{"flag":false,"StudentID":"1","CourseID":"1","score":"80"}';
          const recvDataObj = JSON.parse(recvData);
          console.log(recvDataObj.success);
          myself.jsInsertContent = JSON.stringify(recvDataObj);
        },
        (e) => {
          console.log(e);
          myself.jsInsertContent = "请求异常。";
        }
      );
    }
  }
});
</script>

<style scoped>
input,
textarea {
  width: 100%;
}
</style>
