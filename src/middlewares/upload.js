import multer from "multer";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
destination: TEMP_UPLOAD_DIR,
filename: (req, file, callback) => {
    const fileName = `${Date.now()}_${file.originalname}`
    callback(null,fileName)
}
})

const limits = 1024 * 1024 * 5;

const fileFilter = (req, file, callback) => {
const extension = file.originalname.split('.').pop();
if(extension === 'exe') {
    return callback(createHttpError(400, ".exe extension not allow"))
}
callback(null,true)
}

export const upload = multer({
    storage,
    limits,
    fileFilter
})