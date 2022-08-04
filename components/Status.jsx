export default function Status({ message, type = 'error' }) {
  if (!message) {
    return null
  }

  return (
    <div className={`status status__${type}`} role='container'>
      {message}
    </div>
  )
}
