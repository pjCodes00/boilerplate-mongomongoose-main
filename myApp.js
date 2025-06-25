require('dotenv').config();
const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema= new mongoose.Schema({
  name: {
    type: String
  },

  age:{
    type: Number
  },

  favoriteFoods:{
    type: [String]
  }
})

 
let Person;
Person=mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person= new Person({
    name: 'Jane',
    age: 20,
    favoriteFoods: ['pizza', 'cake']
  })

  person.save((err, data) => {
   if (err) return done(err)
    return done(null, data)
  })
 
};

const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople, (err, data) => {
    if(err) return done(err)
     return done(null, data) 
   })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err) return done(err)
      return done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return done(err)
      return done(null, data) 
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return done(err)
      return done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return done(err)

      person.favoriteFoods.push(foodToAdd)

      person.save((err, updatePerson) => {
        if(err) return done(err)
          return done(null, updatePerson)
      })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
   {name: personName},
   {age: ageToSet},
   {new: true},
   (err, updatedPerson) => {
     if(err) return done(err)
      return done(null, updatedPerson)
   }
  )
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
