const express = require('express');
const router = express.Router();
const Story = require('../../models/Story')


router.get('/root', (req, res) => res.json({
  message: 'You are now at the story route'
}));

// Create a Story
router.post('/create', (req, res) => {

  Story.findOne({storyID: req.body.storyID})
    .then(story => {
      if (story) {
        return res.status(400).json({ game: "Duplicate Story Code" })
      } else {
        const newStory = new Story({
          writers: {
            creator: req.body.currentUser,
            contributors: [req.body.currentUser] 
          },
          codedStory: "",
          decodedStory: "",
          storyID: req.body.storyID
        })

        newStory.save()
          .then(story => res.json(story))
          .catch(err => res.status(400).json({
            message: "Houston, we've got a problem",
            error: err
          }))
      }
    })
})

// Add to a story
router.patch('/continue', (req, res) => {
  Story.findOne({storyID: req.body.storyID})
    .then (story => {
      if (!story) {
        return res.status(404).json({ game: "Story not found!" })
      }
      // res.send(story)
      else {
        // if (!story.writers.contributors.includes(req.body.currentUser)) {
        //   story.writers.contributors.push({user: req.body.currentUser})
        // }
        // story.save()
        // story.codedStory = req.body.emojis;
        // story.decodedStory = req.body.text;
        // story.save()
        //   then(updatedStory => res.json(updatedStory))
        //   .catch(err => console.log(err))
        
        res.send(story)
      }
    })
    .catch(err => res.status(400))
})




module.exports = router