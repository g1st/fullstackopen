const router = require('express').Router();
const personsController = require('../controllers/persons');

router.get('/', personsController.index);
router.get('/:id', personsController.getPerson);
router.post('/', personsController.addPersonPost);
router.delete('/:id', personsController.deletePerson);
router.put('/:id', personsController.updatePersonPut);

module.exports = router;
