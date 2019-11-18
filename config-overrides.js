const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// module.exports = function override(config, env) {
//   // do stuff with the webpack config...
//   return config;
// };
module.exports = override(
//针对antd实现按需打包：根据import
    fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style:true, //自动打包相关的样式
	}),
	//使用lessLoader对
	addLessLoader({
	    javascriptEnabled: true,
		modifyVars: { '@primary-color': '#0AA679' },
	})
)