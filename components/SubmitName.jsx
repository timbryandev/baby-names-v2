import { useRef } from 'react'

export default function SubmitName({ onError, onSubmit }) {
  const formRef = useRef(null)
  const submitBtnRef = useRef(null)

  async function handleSubmit(evt) {
    onError(null)

    if (formRef.current === null) return

    try {
      evt.preventDefault()
      submitBtnRef.current.setAttribute('disabled', 'disabled')

      const formData = Object.fromEntries(
        new FormData(formRef.current).entries(),
      )

      const response = await fetch('/api/post-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok === false) {
        throw new Error(
          'There was an error submitting your name - please try again.',
        )
      }

      onSubmit()
      formRef.current.reset()
      submitBtnRef.current.removeAttribute('disabled')
    } catch (error) {
      onError(error.message)
      submitBtnRef.current.removeAttribute('disabled')
    }
  }

  return (
    <form className='entry-new' ref={formRef} onSubmit={handleSubmit}>
      <label>
        <input
          required
          type='text'
          name='baby'
          id='baby'
          className='form-control'
          placeholder='Suggest a baby name'
        />
      </label>
      <label>
        <input
          required
          type='text'
          name='user'
          id='user'
          className='form-control'
          placeholder='Your name'
        />
      </label>
      <label>
        <button type='submit' ref={submitBtnRef}>
          Submit
        </button>
      </label>
    </form>
  )
}
