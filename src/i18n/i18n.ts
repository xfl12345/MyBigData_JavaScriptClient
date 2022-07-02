// i18n.ts

// import elementUILocale from "element-plus/lib/locale";
import { createI18n } from "vue-i18n";
import { cn } from "./langs";

export const i18n = createI18n({
  locale: localStorage.lang || cn
});
// elementUILocale.i18n((key, value) => i18n.t(key, value));
