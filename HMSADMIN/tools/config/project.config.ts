import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  FONTS_DEST = `${this.APP_DEST}/font-awesome/fonts`;
  FONTS_SRC = ['node_modules/font-awesome/fonts/**'];
  
  PRIME_NG_THEME = 'ulitmate';
  CSS_IMAGE_DEST = `${this.CSS_DEST}/images`;
  CSS_IMAGE_SRC = [
  'node_modules/primeng/resources/themes/' + this.PRIME_NG_THEME + '/images/**'
  ];
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      
      { src: 'primeng/resources/primeng.min.css', inject: true },     
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },

      // { src: 'primeng/resources/themes/ulitmate/theme-dark-blue.css', inject: true },
      // { src: 'primeng/resources/layout/css/layout-dark-blue.css', inject: true },


       { src: 'primeng/resources/themes/ulitmate/theme-indigo.css', inject: true },
      { src: 'primeng/resources/layout/css/layout-indigo.css', inject: true },
      { src: 'primeng/resources/layout/css/animate.css', inject: true },
      { src: 'primeng/resources/demo/css/fullcalendar.css', inject: true },
      
      {src: 'primeng/resources/layout/js/ripple.js', inject: 'libs'},
      {src: 'primeng/jquery/jquery-1.8.1.js', inject: 'libs'},
      {src: 'primeng/resources/layout/js/nanoscroller.js', inject: 'libs'},
      {src: 'primeng/resources/layout/js/layout.js', inject: 'libs'},
      // {src: 'primeng/resources/demo/js/jquery.deps.js', inject: 'libs'},
      // {src: 'primeng/resources/demo/js/layout.js', inject: 'libs'},
      // {src: 'primeng/resources/demo/js/charts.min.js', inject: 'libs'},
      {src: 'primeng/resources/demo/js/moment.js', inject: 'libs'},
       {src: 'primeng/resources/demo/js/fullcalendar.js', inject: 'libs'},
      // {src: 'primeng/resources/demo/js/quill.min.js', inject: 'libs'},

    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. lodash)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }];
    //
    // or
    //
    // let additionalPackages: ExtendPackages[] = [];
    //
    // additionalPackages.push({
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
