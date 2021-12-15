const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
/*
//todos las rutas debajo estaran dentro de la seguridad de las sessions
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});
*/
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});



router.get('/electronic_libros',isAuthenticated, async(req, res, next) => {
  //const book = await BOOK.find();
  res.render('electronic_libros');
});

const BOOK= require('../models/libro');

router.get('/libros',isAuthenticated, async(req, res, next) => {
  const book = await BOOK.find();
  res.render('libros', {book} );
});

router.post('/add',isAuthenticated,async(req,res,next)=>{
  const libro =new BOOK(req.body);
  await libro.save();
  res.redirect('/libros');
});

router.get('/add_libros',isAuthenticated, async(req, res, next) => {
  //const book = await BOOK.find();
  res.render('add_libros');
});

router.get('/edit_libro/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const edit_book = await BOOK.findById(id);
  res.render('edit_libro',{edit_book});

});

router.post('/edit_libro/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await BOOK.updateOne({_id:id},req.body);
  res.redirect('/libros');
});

router.get('/delete/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await BOOK.remove({_id:id});
   res.redirect('/libros');
});

////////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const AUDIO= require('../models/audio_libro');

router.get('/audio_libros',isAuthenticated, async(req, res, next) => {
  const audio_book = await AUDIO.find();
  res.render('audio_libros', {audio_book});
});

router.post('/add_audio',isAuthenticated,async(req,res,next)=>{
  const audio_book =new AUDIO(req.body);
  await audio_book.save();
  res.redirect('/audio_libros');
});

router.get('/edit_audio/:id',isAuthenticated,async(req,res, next)=>{
  const{id}= req.params;
  const edit_audio = await AUDIO.findById(id);
  res.render('edit_audio',{edit_audio});

});

router.post('/edit_audio/:id',isAuthenticated, async(req,res, next)=>{
  const{id}= req.params;
  await AUDIO.updateOne({_id:id},req.body);
  res.redirect('/audio_libros');
});

router.get('/delete_audio/:id',isAuthenticated, async(req, res, next)=>{
  const {id} = req.params;
   await AUDIO.remove({_id:id});
   res.redirect('/audio_libros');
});

////////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;