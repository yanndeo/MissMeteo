const express = require('express');
const router = express.Router(); //Dont forget

router.get('/', (req, res) => {
    res.send({ response: "I am alive, i am blessed" }).status(200)
});


module.exports = router;