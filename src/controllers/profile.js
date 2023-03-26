const model = require('../models/profile')
const respons = require('../helpers/response')
const S3 = require('aws-sdk').S3;
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');


class Profile {
    S3_BUCKET = 'lab-storage'

    async commit(req, res) {
        try {
            const result = await model.commit()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async drop(req, res) {
        try {
            const result = await model.drop()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respons(res, 200, result)
        } catch (error) {
            return respons(res, 500, error)
        }
    }

    async addProfile(req, res) {
        try {
            const s3 = new S3({
                secretAccessKey: 'OwvdpnHuHqbfHDXdZEWjbr6uqvmBcvlN9TxOIrV4',
                accessKeyId: 'M2RDIPWZ4ZP3E8DYFX76',
                endpoint: 'https://is3.cloudhost.id/lab-storage',
            });
            const file = req.files.image
            const body = req.body
            console.log(req.files.image);

            // if (!req.files.image) {
            //     return respons(res, 400, 'upload file is required')
            // }
            // if (body.name === '' || body.age === '' ||
            //     body.dateOfBirth === '' || body.whatsappNumber === '' ||
            //     body.homeTown === '' || body.lastEducation === '') {
            //     return respons(res, 400, 'Field is required')
            // }

            // upload to object storage 500px image
            const params500 = {
                Bucket: 'lab-storage',
                Key: `image/profile/500/${uuidv4()}_${file.name}`,
                Body: file.data,
                ACL: 'public-read',
                ContentType: file.mimetype,
                ContentDisposition: 'inline'
            };
            const s3Result500 = await s3.upload(params500).promise()

            // upload to object storage 1000px image
            const params1000 = {
                Bucket: 'lab-storage',
                Key: `image/profile/1000/${uuidv4()}_${file.name}`,
                Body: file.data,
                ACL: 'public-read',
                ContentType: file.mimetype,
                ContentDisposition: 'inline'
            };
            const s3Result1000 = await s3.upload(params1000).promise()

            const profileData = {
                name: body.name,
                age: body.age,
                dateOfBirth: body.dateOfBirth,
                whatsappNumber: body.whatsappNumber,
                homeTown: body.homeTown,
                lastEducation: body.lastEducation,
                imageKey500: s3Result500.Location,
                imageKey1000: s3Result1000.Location
            }
            console.log(profileData);
            const result = await model.addProfile(profileData)
            return respons(res, 200, 'successfully add profile')
        } catch (error) {
            console.log(error);
            return respons(res, 500, error)
        }
    }


    // async updateMahasiswa(req, res) {
    //     try {
    //         const result = await model.updateMahasiswa(req.body, req.params.id)
    //         return respons(res, 200, 'successfully update mahasiswa')
    //     } catch (error) {
    //         console.log(error)
    //         return respons(res, 400, error)
    //     }
    // }

    // async deleteMahasiswa(req, res) {
    //     try {
    //         const result = await model.deleteMahasiswa(req.params.id)
    //         return respons(res, 200, 'successfully delete mahasiswa')
    //     } catch (error) {
    //         console.log(error)
    //         return respons(res, 400, error)
    //     }
    // }

    // async avgScoreMahasiswa(req, res) {
    //     try {
    //         const result = await model.avgScoreMahasiswa(req.params.id)
    //         return respons(res, 200, result)
    //     } catch (error) {
    //         console.log(error)
    //         return respons(res, 400, error)
    //     }
    // }

}

module.exports = new Profile()