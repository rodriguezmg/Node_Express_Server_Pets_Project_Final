const express = require('express')
const router = express.Router()
const mongodb = require('../database/mongodbUtils.js')
const ObjectId = require('mongodb').ObjectId

const Pet = require('../models/pet.js')

router.get('/', function(req, res){
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 3

    let pets = mongodb.getPetsCollection()

    pets.find().skip((page - 1) * limit).limit(page * limit).toArray((err, result) => {
        if (err) {
            res.sendStatus(500)
        } else if (result.length === 0) {
            res.sendStatus(404)
        } else {
            res.json(result)
        }
    })
})

router.post('/', function(req, res) {
    const name = req.body.name
    const age = req.body.age
    const species = req.body.species
    const race = req.body.race
    const picture = req.body.picture
    const description = req.body.description

    const pet = new Pet(name, age, species, race, picture, description)

    let pets = mongodb.getPetsCollection()

    pets.insertOne(pet)

    res.redirect('/')
})

router.get('/:id', function(req, res) {
    const id = req.params.id

    const pets = mongodb.getPetsCollection()

    pet = pets.find({_id: new ObjectId(id)}).toArray((err, result) => {
        if (err) {
            res.sendStatus(500)
        } else if (result.length === 0) {
            res.sendStatus(404)
        } else {
            res.json(result)
        }
    })
})

router.delete('/:id', function(req, res) {
    const name = req.params.id

    const pets = mongodb.getPetsCollection()

    pets.deleteOne({_id: new ObjectId(id)})

    res.sendStatus(200)
})

module.exports = router