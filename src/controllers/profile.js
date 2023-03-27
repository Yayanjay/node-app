const model = require('../models/profile')
const respons = require('../helpers/response')
const S3 = require('aws-sdk').S3;
const { v4: uuidv4 } = require('uuid');
const { getById } = require('../models/profile');
const sharp = require('sharp');


class Profile {
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

    async getById(req, res) {
        try {
            const result = await model.getById(req.params.id)
            return respons(res, 200, result)
        } catch (error) {
            console.log(error)
            return respons(res, 400, error)
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

            // Create two different sizes of the image
            const image500 = await sharp(file.data).resize(500).toBuffer();
            const image1000 = await sharp(file.data).resize(1000).toBuffer();

            // upload to object storage 500px image
            const params500 = {
                Bucket: 'lab-storage',
                Key: `image/profile/500/${uuidv4()}_${file.name}`,
                Body: image500,
                ACL: 'public-read',
                ContentType: file.mimetype,
                ContentDisposition: 'inline'
            };
            const s3Result500 = await s3.upload(params500).promise()

            // upload to object storage 1000px image
            const params1000 = {
                Bucket: 'lab-storage',
                Key: `image/profile/1000/${uuidv4()}_${file.name}`,
                Body: image1000,
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
            return respons(res, 200, { msg: 'successfully add profile', data: result })
        } catch (error) {
            console.log(error);
            return respons(res, 500, error)
        }
    }

    async updateProfile(req, res) {
        try {
            const s3 = new S3({
                secretAccessKey: 'OwvdpnHuHqbfHDXdZEWjbr6uqvmBcvlN9TxOIrV4',
                accessKeyId: 'M2RDIPWZ4ZP3E8DYFX76',
                endpoint: 'https://is3.cloudhost.id/lab-storage',
            });
            const file = req.files
            const body = req.body
            const id = req.params.id
            console.log(req.file);

            const profile = await model.getById(id);

            if (!profile) {
                return { note: `Profile with id ${id} not found` };
            }

            if (file) {

                // Create two different sizes of the image
                const image500 = await sharp(file.image.data).resize(500).toBuffer();
                const image1000 = await sharp(file.image.data).resize(1000).toBuffer();

                // upload to object storage 500px image
                const params500 = {
                    Bucket: 'lab-storage',
                    Key: `image/profile/500/${uuidv4()}_${file.image.name}`,
                    Body: image500,
                    ACL: 'public-read',
                    ContentType: file.image.mimetype,
                    ContentDisposition: 'inline'
                };
                const s3Result500 = await s3.upload(params500).promise()

                // upload to object storage 1000px image
                const params1000 = {
                    Bucket: 'lab-storage',
                    Key: `image/profile/1000/${uuidv4()}_${file.image.name}`,
                    Body: image1000,
                    ACL: 'public-read',
                    ContentType: file.image.mimetype,
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
                const result = await model.updateProfile(id, profileData)
                return respons(res, 200, `successfully update profile number ${id}`)
            } else {
                const profileData = {
                    name: body.name,
                    age: body.age,
                    dateOfBirth: body.dateOfBirth,
                    whatsappNumber: body.whatsappNumber,
                    homeTown: body.homeTown,
                    lastEducation: body.lastEducation,
                }
                const result = await model.updateProfile(id, profileData)
                return respons(res, 200, `successfully update profile number ${id}`)
            }

        } catch (error) {
            console.log(error);
            return respons(res, 500, error)
        }
    }
}

module.exports = new Profile()