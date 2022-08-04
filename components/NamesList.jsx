import { useEffect, useState } from 'react'
import getNames from '../utils/fetch-names'
import castVote from '../utils/cast-vote'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function NamesList() {
  const [names, setNames] = useState()
  const [myVotes, setMyVotes] = useLocalStorage('myVotes', [])

  async function updateVotes(id, vote) {
    const { data, error } = await castVote(id, vote)
    if (!data || error) return
    setNames(data)
    setMyVotes([...myVotes, id])
  }

  async function updateNames() {
    const { data, error } = await getNames()
    if (!data || error) return
    setNames(data)
  }

  // Initial fetch and long-polling names
  useEffect(() => {
    setNames(null)
    updateNames()
    const id = setInterval(updateNames, 10000)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <>
      <table className='names' role='container'>
        <thead>
          <tr>
            <th>Baby Name</th>
            <th>Submitted by</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {names === null && (
            <tr>
              <td colSpan={3} className='info'>
                Loading names&hellip;
              </td>
            </tr>
          )}
          {names && names.length === 0 && (
            <tr>
              <td colSpan={3} className='info'>
                Looks like you're the first one here - submit a suggestion and
                get the ball rolling!
              </td>
            </tr>
          )}
          {names &&
            names.map(({ content, id, user, votes }) => {
              const hasVoted = myVotes.includes(id)
              return (
                <tr key={`${id}-${content}`}>
                  <td>{content}</td>
                  <td>{user}</td>
                  <td>
                    <button
                      onClick={() => updateVotes(id, votes + 1)}
                      title={
                        hasVoted
                          ? 'You may only add one vote per entry'
                          : 'Click to +1'
                      }
                      disabled={hasVoted}
                    >
                      <span className='count'>{votes + 1}</span> &#128150;
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
