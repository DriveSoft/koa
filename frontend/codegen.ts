if (!AbortSignal.any) {
   AbortSignal.any = function (signals) {
     const controller = new AbortController();
     const onAbort = () => controller.abort();
     signals.forEach(signal => signal.addEventListener('abort', onAbort));
     return controller.signal;
   };
 }

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
   schema: 'http://127.0.0.1:4000/',
   // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
   documents: ['src/**/*.{ts,tsx}'],
   generates: {
      './src/__generated__/': {
         preset: 'client',
         plugins: [],
         presetConfig: {
            gqlTagName: 'gql',
         }
      }
   },
   ignoreNoDocuments: true,
};

export default config;