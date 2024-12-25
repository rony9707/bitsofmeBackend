const getCurrentDateTime = require('../../common/getCurrentDateTime')
const createTags = require('../../common/createTags')
const fs = require('fs');
const { performance } = require('perf_hooks');
const processImageTowebp = require('../../common/processImageTowebp')


//Declare Env variables here
backendConnectionString = process.env.backendConnectionString

if (!backendConnectionString) {
  process.exit(1);
}


exports.createPosts = async (req, res) => {
  try {

    //Folder to save the post Images
    const postsSaveFolderPath = `./uploads/posts/${req.body.username}`;

    //If foldername of that username is not created, then make it
    if (!fs.existsSync(postsSaveFolderPath)) {
      fs.mkdirSync(postsSaveFolderPath, { recursive: true });
      console.log('Folder created successfully!');
    } else {
      console.log('Folder already exists.');
    }

    //Declare the other variables here
    let local_username = req.body.username
    let local_postTopic = req.body.postTopic
    let local_postText = ''
    let local_postVisibility = req.body.visibility;
    let local_postCreationDate = getCurrentDateTime()
    let local_PostModificationDate = getCurrentDateTime()
    let local_tags = createTags(local_postText)
    let local_postEditedStatus = false
    let local_postPics = [];

    //Post Text can be empty, only images
    if(req.body.posttext){
      local_postText = req.body.posttext
    }

    //Post Images can be empty, only text
    if (req.files) {
      for (const file of req.files) {
        try {
          const { webpFilename } = await processImageTowebp(
            file.buffer, // Buffer of the current file
            postsSaveFolderPath, // Destination folder path
            file.originalname, // Original filename
            req.originalUrl, // Original request URL
            req.ip // IP address
          );

          let postImages = `${backendConnectionString}/uploads/posts/${local_username}/${webpFilename}`;
          // Push the processed file information to the savedFiles array
          local_postPics.push(postImages);

        } catch (err) {
          console.error(`Error processing file ${file.originalname}:`, err.message);
        }
      }
    }



    res.send(`the result of the CPI intensive task is\n`)

  }

  catch (err) {
    console.log(err)
  }
};




