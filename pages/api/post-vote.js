import executeQuery from '../../lib/db'

const tableName = 'baby_names'

export default async function postVote(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const { id, vote } = req.body

  try {
    if (isNaN(vote) || vote < 0) {
      throw new RangeError(`Invalid vote value`)
    }

    if (isNaN(id) || id < 0) {
      throw new RangeError(`Invalid ID value`)
    }

    // Update the value in the DB
    const saveQuery = await executeQuery({
      query: `UPDATE ${tableName} SET votes=? WHERE id=?`,
      values: [vote, id],
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
