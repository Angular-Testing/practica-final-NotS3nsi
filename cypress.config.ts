import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    specPattern: 'tests/cypress/**/*.cy.ts',
    supportFile: false,
    env: {
      "apiUrl": "https://lldev.thespacedevs.com/2.0.0/"
    }
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '/tests/cypress/**/*.cy.ts'
  }
  
})