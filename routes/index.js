// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()


const profiles = {
	dkwon: {
		name: 'Henry',
		company: 'Apple',
	 	languages: ['Python','Django']
	},
	sjobs: {
		name: 'Harold',
		company: 'Microsoft',
		languages: ['Ruby','GO']
	},
	bgates: {
		name: 'Javier',
		company: 'Intel',
		languages: ['javascritp','php']
	}
}

// POST
router.post('/addProfile', (req, res) => {
	const body = req.body
	body['languages'] = req.body.languages.split(',')
	profiles[body.username] = body

	res.redirect('/profile/' + body.username)
})

// GET, PUT, DELETE


router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})

})

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
})

router.get('/:profile/:username', (req, res) => {
	const profile = req.params.profile
	const username = req.params.username
	const currentProfile = profiles[username]

	if (currentProfile == null) {
		res.json({
			confirmation: 'fail',
			message: 'Profile ' + username + ' not found'
		})

		return
	}

	currentProfile.timestamp = req.timestamp
	res.render('profile', currentProfile)
})

router.get('/query', (req, res) => {
	const name = req.query.name
	const occupation = req.query.occupation

	const data = {
		name: name,
		occupation: occupation
	}

 	res.render('profile', data)
})

// Get Parameter
router.get('/:path', (req, res) => {
	const path = req.params.path
	res.json({
		data: path
	})
})

/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
})


module.exports = router
