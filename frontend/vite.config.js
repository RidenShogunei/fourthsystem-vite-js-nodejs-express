import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue','vuex',"vue-router"],
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      dirs: ['src/components/'],
      extensions: ['vue', 'md'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        })
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    createStyleImportPlugin({
      resolvers: [AntDesignVueResolver()],
    })
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
    },
},
})
