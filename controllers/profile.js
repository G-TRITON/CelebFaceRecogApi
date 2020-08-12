const handleProfile = (req, res, db) => {
	const {id} = req.params;
	db.select('*').from('users').where({id: id})
	.then(user => {
		user.length 
		? res.json(user[0])
		: res.status(400).json('User not found')
	})
	.catch(err => console.error('Error', err));
}

module.exports = {
	handleProfile: handleProfile
}