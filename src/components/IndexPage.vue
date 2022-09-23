<template>
  <div ref="templateRoot" class="templateRootStyle" :style="{ backgroundImage: cssBgImgCode }"></div>
</template>

<script lang="tsx">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  props: {
    bgImgURL: {
      type: String as PropType<string>,
      default: "./static/pic/yourname_dusk.jpg"
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
    // 背景图片 CSS background-image: url (?)
    cssBgImgCode(): string {
      const myself = this;
      return `url('${myself.bgImgURL}')`;
    }
  },
  mounted() {
    const myself = this;
  }
});
</script>

<style scoped>
.templateRootStyle {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  background-repeat: repeat-y;
}
</style>
