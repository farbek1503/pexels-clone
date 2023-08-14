const router = require('express').Router();
const axios = require('axios');

const headers = {
  'Authorization': process.env.API_KEY
}

router.get('/getData/:type/:page/:limit/:query/:orientation', async(req, res) => {
  const {
    type,
    page,
    limit,
    query,
    orientation
  } = req.params;

  if (type === 'photo') {
    const options = {
      url: `https://api.pexels.com/v1/search?page=${page}&per_page=${limit}&query=${query}&orientation=${orientation}`,
      headers
    };

    try {
      const response = await axios.request(options);
      res.json({
        data: response.data
      })
    } catch (error) {
      res.json({
        error
      })
    }
  } else if (type === 'video') {
    const options = {
      url: `https://api.pexels.com/videos/search?page=${page}&per_page=${limit}&query=${query}&orientation=${orientation}`,
      headers
    };

    try {
      const response = await axios.request(options);
      res.json({
        data: response.data
      })
    } catch (error) {
      res.json({
        error
      })
    }
  }
})

router.get('/photoInfo/:id', async(req, res) => {
  const {
    id
  } = req.params;

  const options = {
    url: `https://api.pexels.com/v1/photos/${id}`,
    headers
  };

  try {
    const response = await axios.request(options);
    res.json({
      data: response.data
    })
  } catch (error) {
    res.json({
      error
    })
  }
})

router.get('/videoInfo/:id', async(req, res) => {
  const {
    id
  } = req.params;

  const options = {
    url: `https://api.pexels.com/videos/videos/${id}`,
    headers
  };

  try {
    const response = await axios.request(options);
    res.json({
      data: response.data
    })
  } catch (error) {
    res.json({
      error
    })
  }
})

module.exports = router
