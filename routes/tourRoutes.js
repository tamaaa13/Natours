const express = require('express');
const tourController = require('./../controller/tourController');
const authController = require('./../controller/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// route.param('id', tourController.checkId);

// POST /tour/26237shgd/reviews
// GET /tour/26237shgd/reviews
// GET /tour/26237shgd/reviews/25361gead

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restricTo('user'),
//     reviewController.createReview,
//   );

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTour);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restricTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin); 

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;

// cara lain export dari yang di atas
/*const {
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./../controller/tourController');
*/
/*
route.route('/').get(getAllTour).post(createTour);
route.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = route;
*/
