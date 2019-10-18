var express = require('express')
var router = express.Router()
const fetch = require("node-fetch");

const url = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?'
const stopStr = 'stopid='
const routeStr = 'routeid='
const and = '&'
const format = 'format=json'


router.get('/:stopId', function(req, res, next) {
  console.log('Stop request');
  console.log('Request params: ' + JSON.stringify(req.params));

  fetch(url + stopStr + req.params.stopId + 
    ('routeId' in req.params ? and + routeStr + req.params.routeId + and + format : and + format)
  )
  .then(data => data.json())
  .then(data => res.send(data))
})

router.get("/:stopId/route/:routeId", function(req, res, next) {
  console.log('Route request');
  console.log("Request params: " + JSON.stringify(req.params));

  fetch(
    url +
      stopStr +
      req.params.stopId +
      and + routeStr + req.params.routeId + and + format
  )
    .then(data => data.json())
    .then(data => res.send(data));
});

module.exports = router;