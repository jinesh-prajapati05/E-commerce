import multer, { memoryStorage } from 'multer'

// export const upload = multer({
//     storage: multer.diskStorage(),
//     limits: {
//         fileSize: 1 * 1024 * 1024
//     }
// })

export const upload = multer({
    dest: "uploads/"
})