const URL = '/api/get-names'

async function fetchNames() {
  try {
    const response = await fetch(URL)

    if (response.ok === false) {
      return { data: null, error: 'There was an error fetching names' }
    }

    const data = await response.json()

    return { data, error: null }
  } catch (error) {
    console.error(error)

    return {
      data: null,
      error:
        'There was an issue setting existing names. See the server logs for more information',
    }
  }
}

export default fetchNames
