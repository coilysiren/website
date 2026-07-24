import { defineConfig } from "cypress"

export default defineConfig({
  allowCypressEnv: false,
  video: false,
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    supportFile: false,
  },
})
