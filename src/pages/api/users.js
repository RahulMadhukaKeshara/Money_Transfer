import con from '../../../utils/connect'
import Users from '../../../models/users'

export default async function handler(req, res) {
    const { id } = req.body;
    await con();
    Users.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
}
