const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const createPostController = require('../controller/postsController/createPost')
const upload = require('../common/uploadImage')


router.post('/createpost', authMiddleware, upload('uploads/posts').array('images', 20), createPostController.createPosts)


module.exports = router;