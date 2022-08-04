const URL = '/api/post-vote'

async function castVote(id, vote) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({ id, vote }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(URL, options)

    if (response.ok === false) {
      throw new Error('There was an error saving your vote')
    }

    const data = await response.json()

    return { data, error: null }
  } catch (error) {
    console.error(error)

    return {
      data: null,
      error: 'There was an issue saving your vote - please try again.',
    }
  }
}

export default castVote
