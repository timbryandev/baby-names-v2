import executeQuery from '../../lib/db'

const tableName = 'baby_names'

export default async function postNames(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const { baby, user } = req.body

  try {
    if (!baby || !user) {
      throw new RangeError(
        `You must supply both a name suggestion and your name, please.`,
      )
    }

    // Update the value in the DB
    const saveQuery = await executeQuery({
      query: `INSERT INTO ${tableName} (id, timestamp, content, user, votes) VALUES (NULL, CURRENT_TIMESTAMP, ?, ?, 0)`,
      values: [baby, user],
    })

    if (saveQuery.error) {
      throw new Error(saveQuery.error)
    }

    // Return the value that is now stored in the DB
    const getQuery = await executeQuery({
      query: `SELECT id, content, user, votes FROM ${tableName}`,
    })

    if (getQuery.error) {
      throw new Error(getQuery.error)
    }

    res.status(200).json(getQuery)
  } catch (error) {
    console.error(error)

    res.status(500).send('A server error occurred. Check logs for details')
  }
}
