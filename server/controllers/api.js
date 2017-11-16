/**
 * Created by nap on 2017/3/22.
 */
var request = require('request')
var qs = require('qs')

module.exports = {
  get (req, res) {
    // console.log(req.query,req.params,req.get('Content-Type'));
    const serviceCatalog = req.get('service-catalog')
    if (serviceCatalog) {
      const url = req.params['0']
      const options = {
        url: serviceCatalog + '/' + url + (req.query ? '?' + qs.stringify(req.query) : ''),
        method: 'get',
        headers: {},
        body: req.body,
        json: true
      }

      const Authorization = req.get('Authorization') || ''

      if (Authorization) {
        options.headers.Authorization = Authorization
      }
      console.log(options)

      request(options, (error, response, body) => {
        // console.log(error,response.statusCode,body)
        if (error) {
          res.status(404).send({error})
        } else {
          res.status(response.statusCode).send(body)
        }
      })
    } else {
      res.status(404).send({message: 'service-catalog missing'})
    }
  },
  post (req, res) {
    const serviceCatalog = req.get('service-catalog')
    if (serviceCatalog) {
      const url = req.params['0']
      const options = {
        url: serviceCatalog + '/' + url + (req.query ? '?' + qs.stringify(req.query) : ''),
        method: 'post',
        headers: {},
        body: req.body,
        json: true
      }

      const Authorization = req.get('Authorization') || ''

      if (Authorization) {
        options.headers.Authorization = Authorization
      }
      console.log(options)

      request(options, (error, response, body) => {
        // console.log(error,response.statusCode,body)
        if (error) {
          res.status(404).send({error})
        } else {
          res.status(response.statusCode).send(body)
        }
      })
    } else {
      res.status(404).send({message: 'service-catalog missing'})
    }
  },
  put (req, res) {
    const serviceCatalog = req.get('service-catalog')
    if (serviceCatalog) {
      const url = req.params['0']
      const options = {
        url: serviceCatalog + '/' + url + (req.query ? '?' + qs.stringify(req.query) : ''),
        method: 'put',
        headers: {},
        body: req.body,
        json: true
      }

      const Authorization = req.get('Authorization') || ''

      if (Authorization) {
        options.headers.Authorization = Authorization
      }
      console.log(options)

      request(options, (error, response, body) => {
        // console.log(error,response.statusCode,body)
        if (error) {
          res.status(404).send({error})
        } else {
          res.status(response.statusCode).send(body)
        }
      })
    } else {
      res.status(404).send({message: 'service-catalog missing'})
    }
  },
  patch (req, res) {
    const serviceCatalog = req.get('service-catalog')
    if (serviceCatalog) {
      const url = req.params['0']
      const options = {
        url: serviceCatalog + '/' + url + (req.query ? '?' + qs.stringify(req.query) : ''),
        method: 'patch',
        headers: {},
        body: req.body,
        json: true
      }

      const Authorization = req.get('Authorization') || ''

      if (Authorization) {
        options.headers.Authorization = Authorization
      }
      console.log(options)

      request(options, (error, response, body) => {
        // console.log(error,response.statusCode,body)
        if (error) {
          res.status(404).send({error})
        } else {
          res.status(response.statusCode).send(body)
        }
      })
    } else {
      res.status(404).send({message: 'service-catalog missing'})
    }
  },
  delete (req, res) {
    const serviceCatalog = req.get('service-catalog')
    if (serviceCatalog) {
      const url = req.params['0']
      const options = {
        url: serviceCatalog + '/' + url + (req.query ? '?' + qs.stringify(req.query) : ''),
        method: 'delete',
        headers: {},
        body: req.body,
        json: true
      }

      const Authorization = req.get('Authorization') || ''

      if (Authorization) {
        options.headers.Authorization = Authorization
      }
      console.log(options)

      request(options, (error, response, body) => {
        // console.log(error,response.statusCode,body)
        if (error) {
          res.status(404).send({error})
        } else {
          res.status(response.statusCode).send(body)
        }
      })
    } else {
      res.status(404).send({message: 'service-catalog missing'})
    }
  }
}
