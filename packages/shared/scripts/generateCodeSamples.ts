import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
import type { TagName } from '../src/lib/tagNames';

type CodeSample = {
  component:
    | TagName
    | 'componentsReady'
    | 'styles-border'
    | 'styles-drop-shadow'
    | 'styles-focus'
    | 'styles-frosted-glass'
    | 'styles-gradient'
    | 'styles-grid'
    | 'styles-hover'
    | 'styles-media-query'
    | 'styles-spacing'
    | 'styles-theme'
    | 'styles-typography';
  samples: string[][]; // 2 dimensional to have multiple samples per component
};

type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js' | 'vue';

const componentsJsPath = '../components-js/src/examples';
const componentsAngularPath = '../components-angular/src/app/examples';
const componentsReactPath = '../components-react/src/examples';
const componentsVuePath = '../components-vue/src/examples';

const generateCodeSamples = (): void => {
  const codeSamples: CodeSample[] = [
    {
      component: 'componentsReady',
      samples: [
        [
          componentsJsPath + '/../../projects/jsdom-polyfill/tests/unit/specs/componentsReady.spec.ts',
          componentsAngularPath + '/../../componentsReady-karma.spec.ts',
          componentsReactPath + '/../../projects/react-wrapper/tests/unit/specs/componentsReady.spec.tsx',
        ],
        [componentsAngularPath + '/../../../tests/unit/specs/componentsReady-testbed.spec.ts'],
        [componentsAngularPath + '/../../../tests/unit/specs/componentsReady-testing-library.spec.ts'],
      ],
    },
    {
      component: 'p-accordion',
      samples: [
        [
          componentsJsPath + '/accordion-example.html',
          componentsAngularPath + '/accordion-example.component.ts',
          componentsReactPath + '/AccordionExample.tsx',
        ],
      ],
    },
    {
      component: 'p-carousel',
      samples: [
        [
          componentsJsPath + '/carousel-example-events.html',
          componentsAngularPath + '/carousel-example-events.component.ts',
          componentsReactPath + '/CarouselExampleEvents.tsx',
        ],
        [
          componentsJsPath + '/carousel-example-dynamic-slides.html',
          componentsAngularPath + '/carousel-example-dynamic-slides.component.ts',
          componentsReactPath + '/CarouselExampleDynamicSlides.tsx',
        ],
        [
          componentsJsPath + '/carousel-example-jump-to-slide.html',
          componentsAngularPath + '/carousel-example-jump-to-slide.component.ts',
          componentsReactPath + '/CarouselExampleJumpToSlide.tsx',
        ],
      ],
    },
    {
      component: 'p-inline-notification',
      samples: [
        [
          componentsJsPath + '/inline-notification-example-events.html',
          componentsAngularPath + '/inline-notification-example-events.component.ts',
          componentsReactPath + '/InlineNotificationExampleEvents.tsx',
          componentsVuePath + '/InlineNotificationExampleEvents.vue',
        ],
        [
          componentsJsPath + '/inline-notification-example-action-button.html',
          componentsAngularPath + '/inline-notification-example-action-button.component.ts',
          componentsReactPath + '/InlineNotificationExampleActionButton.tsx',
          componentsVuePath + '/InlineNotificationExampleActionButton.vue',
        ],
      ],
    },
    {
      component: 'p-modal',
      samples: [
        [
          componentsJsPath + '/modal-example-accessibility.html',
          componentsAngularPath + '/modal-example-accessibility.component.ts',
          componentsReactPath + '/ModalExampleAccessibility.tsx',
          componentsVuePath + '/ModalExampleAccessibility.vue',
        ],
      ],
    },
    {
      component: 'p-scroller',
      samples: [
        [
          componentsJsPath + '/scroller-example.html',
          componentsAngularPath + '/scroller-example.component.ts',
          componentsReactPath + '/ScrollerExample.tsx',
          componentsVuePath + '/ScrollerExample.vue',
        ],
      ],
    },
    {
      component: 'p-segmented-control',
      samples: [
        [
          componentsJsPath + '/segmented-control-example.html',
          componentsAngularPath + '/segmented-control-example.component.ts',
          componentsReactPath + '/SegmentedControlExample.tsx',
          componentsVuePath + '/SegmentedControlExample.vue',
        ],
      ],
    },
    {
      component: 'p-stepper-horizontal',
      samples: [
        [
          componentsJsPath + '/stepper-horizontal-example.html',
          componentsAngularPath + '/stepper-horizontal-example.component.ts',
          componentsReactPath + '/StepperHorizontalExample.tsx',
          componentsVuePath + '/StepperHorizontalExample.vue',
        ],
      ],
    },
    {
      component: 'p-table',
      samples: [
        [
          componentsJsPath + '/table-example-basic.html',
          componentsAngularPath + '/table-example-basic.component.ts',
          componentsReactPath + '/TableExampleBasic.tsx',
          'src/data/table-data-basic.ts', // order is important since part of filename is extracted for param types of function name
        ],
        [
          componentsJsPath + '/table-example-sorting.html',
          componentsAngularPath + '/table-example-sorting.component.ts',
          componentsReactPath + '/TableExampleSorting.tsx',
          'src/data/table-data-sorting.ts', // order is important since part of filename is extracted for param types of function name
        ],
        [
          componentsJsPath + '/table-example-advanced.html',
          componentsAngularPath + '/table-example-advanced.component.ts',
          componentsReactPath + '/TableExampleAdvanced.tsx',
          componentsVuePath + '/TableExampleAdvanced.vue',
          'src/data/table-data-advanced.ts', // order is important since part of filename is extracted for param types of function name
        ],
      ],
    },
    {
      component: 'p-tabs-bar',
      samples: [
        [
          componentsJsPath + '/tabs-bar-example-basic.html',
          componentsAngularPath + '/tabs-bar-example-basic.component.ts',
          componentsReactPath + '/TabsBarExampleBasic.tsx',
        ],
        [
          componentsJsPath + '/tabs-bar-example-accessibility.html',
          componentsAngularPath + '/tabs-bar-example-accessibility.component.ts',
          componentsReactPath + '/TabsBarExampleAccessibility.tsx',
        ],
      ],
    },
    {
      component: 'p-text-field-wrapper',
      samples: [
        [
          componentsJsPath + '/text-field-wrapper-example-imask.html',
          componentsAngularPath + '/text-field-wrapper-example-imask.component.ts',
          componentsReactPath + '/TextFieldWrapperExampleIMask.tsx',
        ],
        [
          componentsJsPath + '/text-field-wrapper-example-search.html',
          componentsAngularPath + '/text-field-wrapper-example-search.component.ts',
          componentsReactPath + '/TextFieldWrapperExampleSearch.tsx',
        ],
      ],
    },
    {
      component: 'p-toast',
      samples: [
        [
          componentsJsPath + '/toast-example.html',
          componentsAngularPath + '/toast-example.component.ts',
          componentsReactPath + '/ToastExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-border',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-border-example.component.ts',
          componentsReactPath + '/../styles/StylesBorderExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-drop-shadow',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-drop-shadow-example.component.ts',
          componentsReactPath + '/../styles/StylesDropShadowExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-focus',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-focus-example.component.ts',
          componentsReactPath + '/../styles/StylesFocusExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-frosted-glass',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-frosted-glass-example.component.ts',
          componentsReactPath + '/../styles/StylesFrostedGlassExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-gradient',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-gradient-example.component.ts',
          componentsReactPath + '/../styles/StylesGradientExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-grid',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-grid-example.component.ts',
          componentsReactPath + '/../styles/StylesGridExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-hover',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-hover-example.component.ts',
          componentsReactPath + '/../styles/StylesHoverExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-media-query',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-media-query-example.component.ts',
          componentsReactPath + '/../styles/StylesMediaQueryExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-spacing',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-spacing-example.component.ts',
          componentsReactPath + '/../styles/StylesSpacingExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-theme',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-theme-example.component.ts',
          componentsReactPath + '/../styles/StylesThemeExample.tsx',
        ],
      ],
    },
    {
      component: 'styles-typography',
      samples: [
        [
          componentsAngularPath + '/../styles/styles-typography-example.component.ts',
          componentsReactPath + '/../styles/StylesTypographyExample.tsx',
        ],
      ],
    },
  ];

  const packagesFolder = path.resolve(__dirname, '../../');

  const types = [
    `type Framework = 'shared' | 'angular' | 'react' | 'vanilla-js' | 'vue';`,
    `type FrameworkMarkup = { [key in Framework]?: string };`,
  ].join('\n');

  const functions = codeSamples
    .map((codeSample) => {
      console.log(`Generating samples for ${codeSample.component}`);

      const sampleNamesAndContents: { sampleName: string; samples: { [key in Framework]?: string }[] }[] =
        codeSample.samples.map((sampleFileNames, idx) => {
          // generate sampleName from first file of array
          const firstFileName = path.basename(sampleFileNames[0]);

          // componentsReady is a bit special
          const [, sampleName = 'default'] =
            firstFileName.match(
              codeSample.component === 'componentsReady' ? /componentsReady-([a-z-]+)/ : /-(example-[a-z-\d]+)/
            ) || [];
          console.log(`– Sample #${idx + 1}: ${sampleName}`);

          const sampleContents: { [key in Framework]?: string }[] = sampleFileNames.map((fileName) => {
            const filePath = path.resolve(fileName);
            const filePathFromPackagesFolder = filePath.replace(packagesFolder, '');
            const [, extractedFramework = 'shared'] = filePathFromPackagesFolder.match(/\/components-([a-z]+)\//) || [];
            const framework: Framework = extractedFramework === 'js' ? 'vanilla-js' : (extractedFramework as Framework);

            console.log(`  – Reading content of ${filePathFromPackagesFolder}`);
            let fileContent = fs.readFileSync(fileName, 'utf8').replace(/\s$/, '');

            if (framework === 'vanilla-js') {
              // remove getHeadAndData() helper function
              fileContent = fileContent.replace(/\s\sconst getHeadAndData = (\s|\S)*?return(.*\s){3}/, '');
            }

            return { [framework]: fileContent };
          });

          return { sampleName, samples: sampleContents };
        });

      const componentName = pascalCase(codeSample.component.replace('p-', ''));
      const functionName = `get${componentName}CodeSamples`;
      const sampleParams = sampleNamesAndContents.map(({ sampleName }) => sampleName);

      const arrayToObjectJSON = (arr: any[]): string => JSON.stringify(Object.assign({}, ...arr));

      if (sampleParams.length === 1) {
        return `export const ${functionName} = (): FrameworkMarkup => {
  const samples: { [key in Framework]?: string } = ${arrayToObjectJSON(sampleNamesAndContents[0].samples)};
  return samples;
};`;
      } else {
        // multiple samples per component needs a 2nd parameter to select the sample
        const sampleData = sampleNamesAndContents.reduce(
          (result, curr) => ({
            ...result,
            [curr.sampleName]: JSON.parse(arrayToObjectJSON(curr.samples)),
          }),
          {}
        );

        const typeName = `${componentName}SampleName`;
        return `type ${typeName} = ${sampleParams.map((x) => `'${x}'`).join(' | ')};
export const ${functionName} = (sampleName: ${typeName}): FrameworkMarkup => {
  const samples: { [key in ${typeName}]: { [key in Framework]?: string } } = ${JSON.stringify(sampleData)};
  return samples[sampleName];
};`;
      }
    })
    .join('\n\n');

  const content = [types, functions].join('\n\n');

  const targetDirectory = path.normalize('./src/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'codeSamples.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${codeSamples.length} samples`);
};

generateCodeSamples();
