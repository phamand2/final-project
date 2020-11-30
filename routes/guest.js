const express = require('express');
const router = express.Router();
const db = require('../models')





// Create Guest Seat
// URL: /api/v1/guest/:tableId
router.post('/:tableId', (req,res) => {
  const {seat} = req.body


  if (!seat) {
    res.status(404).json({error: 'Enter all fields'})
  }

  db.Guest.create({
    seat,
    TableId: req.params.id
  })
  .then((result) => {
    res.json({success: 'Seat number entered'})
  })
  .catch(err => console.log(err))

})




// Get All Guest By Table ID
// URL: /api/v1/guest
router.get('/:tableId', (req,res)=>{
  db.Guest.findAll({
    where:{
      tableId: req.params.id
    }
  })
  .then(guests => res.json(guests))
})




// // Get Guest by TableId
// // URL: /api/v1/guest/:tableId/guest
// router.get('/:tableId/guest', (req,res)=>{
//   db.Guest.findByPK(req.params.id,{
//     include: db.Table
//   }).then((table)=>{
//     res.json(table.Guests)
//   })
// })



// Delete Guest Seat based on ID
// URL: /api/v1/guest/:deleteId
router.delete('/:deleteId', (req,res)=>{
  db.Guest.destroy({
    where: {
      id: req.params.deleteId,
    }
  })
  .then(deleted => {
    if(deleted === 1) {
      res.status(202).json({
        success: 'Guest deleted'
      })
    }
    else {
      res.status(404).json({
        error: 'Guest not found'
      })
    }
  })
})


module.exports = router;