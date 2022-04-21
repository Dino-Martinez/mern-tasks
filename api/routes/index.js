const Task = require('../models/task')

module.exports = app => {
  app.get('/', async (req, res) => {
    const { user } = req
    console.log('authenticating...')
    return res.json({ payload: user !== null })
  })

  app.post('/', async (req, res) => {
    const data = req.body
    const { user } = req
    console.log('creating task...')
    const task = new Task({ ...data, author: user._id })

    await task.save()

    return res.json({ payload: task })
  })

  app.put('/:id', async (req, res) => {
    const data = req.body

    console.log('updating task...')

    const task = await Task.findByIdAndUpdate(req.params.id, data)

    await task.save()

    return res.json({ payload: task })
  })

  app.delete('/:id', async (req, res) => {
    console.log('deleting task...')
    const result = await Task.deleteOne({ _id: req.params.id })
    return res.json({ payload: result })
  })
}
