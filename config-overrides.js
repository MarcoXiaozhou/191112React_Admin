const {override,fixBabelImports,addLessLoader} = require('customize-cra')
module.exports = override(
    //真对antd按需打包：根据import来打包（使用）
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关样式
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1da57a'}
    })
)