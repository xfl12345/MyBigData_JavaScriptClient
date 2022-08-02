<template>
  <div ref="templateRoot" class="templateRootStyle" :style="bgStyle"></div>
</template>

<script lang="tsx">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  props: {
    staticResDir: {
      type: String as PropType<string>,
      default: "./static"
    }
  },
  setup() {
    const templateRoot = ref<HTMLDivElement>();
    return {
      templateRoot
    };
  },
  data() {
    return {};
  },
  computed: {
    bgImgURL(): string {
      const myself = this;
      return myself.staticResDir + "/pic/yourname_dusk.jpg";
    },
    bgStyle(): any {
      const myself = this;
      return {
        "background-image": `url('${myself.bgImgURL}')`,
        "background-size": "contain"
      };
    }
  }
});
</script>

<style scoped>
.templateRootStyle {
  width: 100%;
  height: 100%;
}
</style>
