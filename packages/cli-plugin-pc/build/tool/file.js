
const fs = require('fs'); //引用文件系统模块
const path = require('path')

const projectPath = path.resolve(__dirname, '../../').replace(/\\/g, '/')

const fileTool = {
  /** 转换路径分割线 */
  transformRelativePath(pathStr, splitStr = '/') {
    let result = pathStr
      .replace(/\\/g, splitStr)
    return result
  },
  /** 获取文件类型 */
  getFileType(fileName) {
    return fileName.match(/(?<=\.)\w+$/)?.[0] ?? ''
  },
  /** 递归读取路径文件 */
  readFileListByPath(dirPath, filesList, formatCallBack) {
    const files = fs.readdirSync(dirPath);
    dirPath += '\\'
    files.forEach(function (item, index) {
      const stat = fs.statSync(dirPath + item);
      if (stat.isDirectory()) {
        //递归读取文件
        fileTool.readFileListByPath(path.resolve(dirPath, item), filesList, formatCallBack)
      } else {

        const obj = formatCallBack({
          dirPath,
          fileName: item,
        })
        if (obj) {
          filesList.push(obj);
        }
      }

    })
    return filesList;

  },
  /** 寻找路径下的文件 */
  findFilesByPathAndType(dirPath, fileTypes) {
  const fileList = [];
  fileTool.readFileListByPath(dirPath, fileList, ({dirPath, fileName}) => {
    let result
    const fileType = fileTool.getFileType(fileName)
    if (fileTypes.some(type => type === fileType)) {
      result = {
        fileType,
        filename: fileName,
        dirPath: fileTool.transformRelativePath(dirPath),
        fullPath: fileTool.transformRelativePath(dirPath + fileName),
      }
    }
    return result
  });
  return fileList
},
  /** 寻找路径下的文件：仅返回全路径 */
  findFilesPathsByPathAndType(dirPath, fileTypes) {
    const arraySplitStr = '[file_split]'
    return {
      arraySplitStr,
      filePaths: fileTool.findFilesByPathAndType(dirPath, fileTypes)?.map(item => item.fullPath),
    }
  }
}
module.exports = fileTool
