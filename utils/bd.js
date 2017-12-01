const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: '../data/site.db'
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Resident=sequelize.define('resident',{
    id:       {type:Sequelize.INTEGER,autoIncrement:true, primaryKey: true},
    fname :   {type: Sequelize.STRING},
    sname:    {type: Sequelize.STRING},
    phone   : {type: Sequelize.STRING},
    house_id: {type: Sequelize.INTEGER, 
        foreignKey: 'house',
        allowNull: false}
});

const Uk=sequelize.define('uk',{
  id: {type:Sequelize.INTEGER,autoIncrement:true, primaryKey: true},
  login : {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  title : {type: Sequelize.STRING},
  director_email : {type: Sequelize.STRING},
  first_name :{type: Sequelize.STRING},
  last_name : {type: Sequelize.STRING},
});

const House=sequelize.define('house',{
  id:       {type:Sequelize.INTEGER,autoIncrement:true, primaryKey: true},
  street :    {type: Sequelize.STRING},
  number:    {type: Sequelize.STRING},
  uk_id: {type: Sequelize.INTEGER, 
      foreignKey: 'uk',
      allowNull: false}
});

const Event = sequelize.define('event',{
  id:  {type:Sequelize.INTEGER,autoIncrement:true, primaryKey: true},
  title :    {type: Sequelize.STRING},
  desc :    {type: Sequelize.STRING},
  date_from :    {type: Sequelize.DATE},
  date_to :    {type: Sequelize.DATE},
  with_house  :    {type: Sequelize.BOOLEAN},
  uk_id : {
    type: Sequelize.INTEGER, 
    foreignKey: 'uk',
    allowNull: false
  }
});

const Response = sequelize.define('response',{
  id:  {type:Sequelize.INTEGER,autoIncrement:true, primaryKey: true},
  resident_id : {
    type: Sequelize.INTEGER, 
    foreignKey: 'resident',
    allowNull: false
  }
});

Uk.sync({force: true}).then(() => {
    // Table created
    return Uk.create({
        login: "lalla",
        password : "password",
        title : "title",
        director_email : "asdf@adf.ru",
        first_name : "lalal",
        last_name : "asdfasdf"
    });
  });

  const ResponsePhoto = sequelize.define('responsePhoto',{
    id:  {type:Sequelize.INTEGER, autoIncrement:true, primaryKey: true, unique:true},
    responce_id : {
      type: Sequelize.INTEGER, 
      foreignKey: 'response',
      allowNull: false
    },
    url :{type:Sequelize.STRING}
});



House.sync({force: true}).then(() => {
    // Table created
    return House.create({
        street : 'kolotushkino',
        number : '86',
        uk_id: 1
    });
  });

Resident.sync({force: true}).then(() => {
    // Table created
    return Resident.create({
        fname: 'John',
        sname: 'Hancock',
        phone: '8800935555',
        house_id : 1
    });
  });

  

  Event.sync({force: true}).then(() => {
    // Table created
    return Event.create({
        title : 'title',
        desc :    'body',
        date_from :    Date.now(),
        date_to :    Date.now(),
        with_house  :    true,
        uk_id : 1
    });
  });


  

Response.sync({force: true}).then(() => {
  // Table created
  return Response.create({
    resident_id : 1
  });
});



ResponsePhoto.sync({force: true}).then(() => {
  // Table created
  return ResponsePhoto.create({
    responce_id : 1,
    url  : 'dasfadsfadsfasdfasdf.ru'
  });
});


