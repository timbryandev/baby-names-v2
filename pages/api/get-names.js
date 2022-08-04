import executeQuery from '../../lib/db'

const tableName = 'baby_names'

export default async function getNames(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }

  try {
    const results = await executeQuery({
      query: `SELECT * FROM ${tableName} ORDER BY content, user ASC`,
    })

    if (results.error) {
      throw new Error(results.error)
    }

    res.status(200).json(results)
  } catch (error) {
    console.error(error)

    res.status(500).send('A server error occurred. Check logs for details')
  }
}
