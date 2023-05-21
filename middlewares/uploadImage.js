const fs = require('fs')
module.exports = async function (req, res, next) {
    try {
        if (!req.files || Object.values(req.files).flat().length === 0) {
            return res.status(400).send({ message: "No files Selected" })
        }
        let files = Object.values(req.files).flat();
        for (const file of files) {
            console.log("first--------", file)
            if (file.mimetype !== 'image/jpg' &&
                file.mimetype !== 'image/png' &&
                file.mimetype !== 'image/gif' &&
                file.mimetype !== 'image/webp'
                && file.mimetype !== 'image/jpeg'
            ) {
                removeTmp(file.tempFilePath)
                return res.status(400).send({ message: "Unsupported format" })
            }
            if (file.size > 1024 * 1024 * 5) {
                return res.status(400).send({ message: "File size is too large" })
            }
        }
        console.log("first")
        next()
    } catch (error) {
        console.log("error :", error)
    }
}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) console.log("error :", err);
        console.log(`${path} was deleted`);
    })
}