const router = require('express').Router();
const fsHelpers = require('../../utils/fsUtils');
const dbFilePath = "./db/db.json";
const { v4: uuidv4 } = require('uuid');

const gettingAllNotes = async () => {
  let jsonText = await fsHelpers.readFromFile(dbFilePath);
  let notes = JSON.parse(jsonText);
  console.log(notes);
  return notes;
};

router.get('/',  async (req, res) => {
  try {
    res.status(200).json(await gettingAllNotes() );
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

});

router.post('/', async (req, res) => {
  try {
    let gettedNotes = await gettingAllNotes();
    let note = req.body;
    note.id = uuidv4();
    gettedNotes.push(note);
    // let savedNote = JSON.stringify(gettedNotes);
    let saveFeedback = await fsHelpers.writeToFile(dbFilePath, gettedNotes);
    res.status(200).json(saveFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

});

router.delete('/:id', async (req, res) => {

  try {
    console.log(req.params);
    let gettedNotes = await gettingAllNotes();
    let resultingAr = 
        gettedNotes.filter(note => note.id != req.params.id);
    let deleteFeedback = await fsHelpers.writeToFile(dbFilePath, resultingAr);
    res.status(200).json(deleteFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

});


module.exports = router;

