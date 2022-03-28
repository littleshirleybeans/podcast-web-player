const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const { parseString } = require('xml2js')
const path = require('path');
const PORT = process.env.PORT || 3001

app.use(cors())


if (process.env.NODE_ENV === 'production') {
  // the __dirname is the current directory from where the script is running
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.use(express.static('build'))

const baseUrl = '/api/pod'

app.get('/', (req, res) => {
  res.status(200)
  res.end('Hello World!')
})

// get podcasts
app.get(`${baseUrl}/search/:item`, (req, res, next) => {
  const item = encodeURI(req.params.item)
  axios
    .get(`https://itunes.apple.com/search?term=${item}&country=US&media=podcast&limit=200`)
    .then(({ data }) => {
      const { results } = data

      if (results) {
        const podcasts = results.map(podcast => {
          return {
            id: podcast.trackId,
            name: podcast.trackName,
            artist: podcast.artistName,
            image: podcast.artworkUrl600,
            feed: podcast.feedUrl,
            genres: podcast.genres
          }
        })
        res.json(podcasts)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// get description of podcast
app.get(`${baseUrl}/podcast/:id/desc`, async (req, res, next) => {
  const id = req.params.id

  try {
    const { data } = await axios.get(`https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=200`).catch(error => next(error))

    const { results } = data

    if (results.length > 0) {
      try {
        const xml = await axios.get(results[0].feedUrl).catch(error => {
          console.log(error)
        })
        try {
          const desc = await new Promise((resolve, reject) => parseString(xml.data, (err, result) => {
            if (err) {
              reject(null)
            } else {
              // console.log(result)
              // const { rss } = result
              // const { channel } = rss
              // const { description } = channel[0]
              const { description } = result.rss.channel[0]
              // console.log(channel)
              console.log(description)

              resolve(description)
            }
          }))
          console.log('desc', desc)
          res.json(desc)
        } catch (error) {
          console.log(error)
          res.json('null')
        }

      } catch (error) {
        return res.status(401).send(err.message);
      }
    }
  } catch (error) {
    next(error)
  }
})


// get episodes
app.get(`${baseUrl}/podcast/:id`, (req, res, next) => {
  const id = req.params.id
  axios.get(`https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=200`).then(({ data }) => {
    const { results } = data

    if (results.length > 0) {

      const podcast = {
        id: results[0].trackId,
        name: results[0].trackName,
        artist: results[0].artistName,
        image: results[0].artworkUrl600,
        feed: results[0].feedUrl,
        genres: results[0].genres
      }

      const episodes = results
        .filter((e, i) => i !== 0)
        .map(episode => {
          return {
            epiId: episode.trackId,
            title: episode.trackName,
            desc: episode.description,
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            image: episode.artworkUrl600,
            url: episode.episodeUrl,
            collectionName: episode.collectionName
          }
        })
      episodes.unshift(podcast)
      res.json(episodes)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

// get popular podcasts
app.get(`${baseUrl}/:code`, (req, res, next) => {
  const code = req.params.code
  axios.get(`https://rss.applemarketingtools.com/api/v2/${code}/podcasts/top/15/podcasts.json`).then(({ data }) => {
    if (data) {
      const results = data.feed.results.map(podcast => {
        return {
          id: podcast.id,
          name: podcast.name,
          artist: podcast.artistName,
          image: podcast.artworkUrl100,
        }
      })
      res.json(results)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

// get latest released episode
app.get(`${baseUrl}/updates/:id`, (req, res) => {
  const id = req.params.id
  axios.get(`https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=1000`)
    .then(({ data }) => {
      const { results } = data
      console.log(results[1].releaseDate)
      const releaseDate = {
        id: id,
        date: results[1].releaseDate
      }
      res.json(releaseDate)
    })
    .catch(error => console.log(error))
})

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// Error Handler Middleware
const errorHandler = (error, req, res, next) => {
  // The console.error() method outputs an error message to the Web console.
  console.error(error.message)

  return res.status(500).json({ error: 'Internal Server Error' })

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})