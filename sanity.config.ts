import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { creditCardType } from './src/sanity/schemaTypes/creditCardType'
import { insuranceProviderType } from './src/sanity/schemaTypes/insuranceProviderType'
import { Logo, StudioLogo } from './src/sanity/components/Logo'

export default defineConfig({
  name: 'screened',
  title: 'Screened',
  
  projectId: 'zhn3pkul',
  dataset: 'production',
  
  basePath: '/admin',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('💳 Credit Cards')
              .child(
                S.documentTypeList('creditCard')
                  .title('Credit Cards')
              ),
            S.listItem()
              .title('🛡️ Insurance Providers')
              .child(
                S.list()
                  .title('Insurance by Category')
                  .items([
                    S.listItem()
                      .title('🚗 Car Insurance')
                      .child(
                        S.documentList()
                          .title('Car Insurance')
                          .filter('_type == "insuranceProvider" && category == "car"')
                      ),
                    S.listItem()
                      .title('🏡 Home Insurance')
                      .child(
                        S.documentList()
                          .title('Home Insurance')
                          .filter('_type == "insuranceProvider" && category == "home"')
                      ),
                    S.listItem()
                      .title('❤️ Life Insurance')
                      .child(
                        S.documentList()
                          .title('Life Insurance')
                          .filter('_type == "insuranceProvider" && category == "life"')
                      ),
                    S.listItem()
                      .title('🏠 Renters Insurance')
                      .child(
                        S.documentList()
                          .title('Renters Insurance')
                          .filter('_type == "insuranceProvider" && category == "renters"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('All Insurance Providers')
                      .child(
                        S.documentTypeList('insuranceProvider')
                          .title('All Insurance Providers')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  
  schema: {
    types: [creditCardType, insuranceProviderType],
  },
  
  // Custom branding
  studio: {
    components: {
      logo: Logo,
    },
  },
})
