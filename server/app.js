const path = require('path');
const express = require('express');
//const csurf = require('csurf');
//const expressSession = require('express-session');
//const createSessioonConfig = require('./config/session');
//const db = require('./data/database');
//const addCsurfMiddleware = require('./middlewares/csurf-token')
//const errorHandlingMiddleware = require('./middlewares/error-handling');
const adminpanelRoutes = require('./routes/adminpanel.routes')
const authRoutes = require('./routes/auth.routes')
const homeRoutes = require('./routes/home.routes')
const cousesRoutes = require('./routes/couses.routes')
const degreeRoutes = require('./routes/degree.routes')  
const contentRoutes = require('./routes/contentpage.routes')
const forumRoutes = require('./routes/forum.routes')
const codeEditorRoutes = require('./routes/code-editor.routes')
const reportRoutes = require('./routes/report.routes')  
const app = express();
app.set('view engine', 'ejs') 
app.set('views' ,path.join(__dirname , 'views')  )
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
//const sessionConfig = createSessioonConfig();
//app.use(expressSession(sessionConfig));
//app.use(csurf());
//app.use(addCsurfMiddleware);
app.use(adminpanelRoutes)
app.use(homeRoutes);
app.use(cousesRoutes);
app.use(forumRoutes);
app.use(contentRoutes);
app.use(reportRoutes);
app.use(degreeRoutes);
app.use(authRoutes);
app.use(codeEditorRoutes);
//app.use(errorHandlingMiddleware)
//db.connectToDatabase()
 // .then(() => {
    app.listen(3000);
 // })
 // .catch((error) => {
 //   console.log('Failed to Connect');
   // console.log(error);
  //});