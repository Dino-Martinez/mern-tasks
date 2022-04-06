const Task = require('../models/task')

module.exports = app => {
  app.get('/', async (req, res) => {
    const allTasks = await Task.find({}).lean()
    res.json({ payload: allTasks })
  })

  app.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)

    res.json({ payload: task })
  })

  app.post('/', async (req, res) => {
    const data = req.body

    const task = new Task(data)

    await task.save()

    res.json({ payload: task })
  })

  app.put('/:id', async (req, res) => {
    const data = req.body

    const task = await Task.findByIdAndUpdate(req.params.id, data)

    await task.save()

    res.json({ payload: task })
  })

  app.delete('/:id', async (req, res) => {
    const result = await Task.deleteOne({ _id: req.params.id })
    res.json({ payload: result })
  })
}
