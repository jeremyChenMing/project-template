/**
 * Created by nap on 16/12/20.
 */
var multer = require('multer')
var upload = multer({dest: '../build/upload'})

module.exports = upload
