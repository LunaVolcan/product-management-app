import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NewFeedback() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('new-feedback-body')
    return () => {
      document.body.classList.remove('new-feedback-body')
    }
  }, [])

  const [formData, setFormData] = useState({
    title: '',
    category: 'Feature',
    detail: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSubmitted(false) // clear success message if editing again
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title cannot be empty'
    if (!formData.detail.trim()) newErrors.detail = 'Detail cannot be empty'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    await fetch('https://product-management-app-w62f.onrender.com/post-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    setFormData({ title: '', category: 'Feature', detail: '' })
    setSubmitted(true)
  }

  return (
    <div className="container-feedback">
      <button type="button" onClick={() => navigate(-1)} className="go-back-button">
        ← Go Back
      </button>

      <form onSubmit={handleSubmit} className="feedback-form">
        <h2>Create New Feedback</h2>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {['Feature', 'UI', 'UX', 'Enhancement', 'Bug'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label htmlFor="detail">Detail</label>
        <textarea
          id="detail"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
        />
        {errors.detail && <p className="form-error">{errors.detail}</p>}

        <button type="submit" className="submit-button">Submit</button>

        {submitted && <p className="form-success">✨ Feedback submitted! ✨</p>}
      </form>
    </div>
  )
}

export default NewFeedback