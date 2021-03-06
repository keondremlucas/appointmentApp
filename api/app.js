var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//GRAPHQL Implementation
const { graphqlHTTP } = require('express-graphql');
const { 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const appointments = [{id:'62728086faeb133d09fddc02',appointmentDate: '5/1/2020', name: 'Dre', email: 'k@yahoo.com'},{id: '6272d49c034ab0c58de370ee', appointmentDate: '5/2/1990', name: 'Shelly', email: 'shelly@yahoo.com'}]


  const AppointmentType = new GraphQLObjectType({
  name: 'Appointment',
  fields: () => 
  ({
    id: {
      type: GraphQLString
    },
    appointmentDate:{
      type:GraphQLString
    },
    name:{
      type:GraphQLString
    },
    email: 
    {
      type:GraphQLString
    }
   })

  });

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => 
    ({
      appointment: 
      {
          type: AppointmentType,
          args: {id: {type: GraphQLString}},
          resolve(parent,args)
          {
            appointments.forEach(Appointment => {
              if(Appointment.id == args)
              {
                return(Appointment);
              }
            });
          }
      }
    })
  });

const schema = new GraphQLSchema({
  query:RootQuery
})



const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//Connect to MongoDB Database
 MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
  console.log('Connected to MongoDB');
  const db = client.db(config.dbName);
  const collection = db.collection('appointments');
  app.locals[config.dbCollection] = collection;
}).catch(error => { console.log(error); });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//GraphQL GUI Route
app.use('/graphql', graphqlHTTP({graphiql: true, schema: schema}));

//Fetch Collection 
app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
});
//ROUTERS
app.use('/appointments', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => 
{console.log('Server is running on port 3000');
});
module.exports = app;
