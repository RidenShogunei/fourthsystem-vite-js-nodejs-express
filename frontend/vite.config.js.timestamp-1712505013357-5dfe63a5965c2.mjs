// vite.config.js
import { defineConfig } from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createStyleImportPlugin } from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/vite-plugin-style-import/dist/index.mjs";
import Icons from "file:///C:/Users/chenj/Desktop/fourthsystem-vite-js-nodejs-express/frontend/node_modules/unplugin-icons/dist/vite.js";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vuex", "vue-router"],
      resolvers: [AntDesignVueResolver()]
    }),
    Components({
      dirs: ["src/components/"],
      extensions: ["vue", "md"],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true
    }),
    createStyleImportPlugin({
      resolvers: [AntDesignVueResolver()]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjaGVualxcXFxEZXNrdG9wXFxcXGZvdXJ0aHN5c3RlbS12aXRlLWpzLW5vZGVqcy1leHByZXNzXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjaGVualxcXFxEZXNrdG9wXFxcXGZvdXJ0aHN5c3RlbS12aXRlLWpzLW5vZGVqcy1leHByZXNzXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9jaGVuai9EZXNrdG9wL2ZvdXJ0aHN5c3RlbS12aXRlLWpzLW5vZGVqcy1leHByZXNzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCdcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6ICcuLycsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCd2dWV4JyxcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgICAgIHJlc29sdmVyczogW0FudERlc2lnblZ1ZVJlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cy8nXSxcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLCAvLyBjc3MgaW4ganNcclxuICAgICAgICB9KVxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICBJY29ucyh7XHJcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsXHJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICAgIHJlc29sdmVyczogW0FudERlc2lnblZ1ZVJlc29sdmVyKCldLFxyXG4gICAgfSlcclxuICBdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVZLFNBQVMsb0JBQW9CO0FBQ3BhLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLCtCQUErQjtBQUN4QyxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLE9BQU0sUUFBTyxZQUFZO0FBQUEsTUFDbkMsV0FBVyxDQUFDLHFCQUFxQixDQUFDO0FBQUEsSUFDcEMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsTUFBTSxDQUFDLGlCQUFpQjtBQUFBLE1BQ3hCLFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixXQUFXO0FBQUEsUUFDVCxxQkFBcUI7QUFBQSxVQUNuQixhQUFhO0FBQUE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDSixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsSUFDRCx3QkFBd0I7QUFBQSxNQUN0QixXQUFXLENBQUMscUJBQXFCLENBQUM7QUFBQSxJQUNwQyxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
