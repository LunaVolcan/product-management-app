import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewFeedback() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    category: 'Feature',
    detail: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('https://product-management-app-w62f.onrender.com/post-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    alert('Feedback submitted!')
    setFormData({ title: '', category: 'Feature', detail: '' })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => navigate(-1)}>← Go Back</button>

      <h2>Create New Feedback</h2>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange}>
        {['Feature', 'UI', 'UX', 'Enhancement', 'Bug'].map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <label>Detail</label>
      <textarea
        name="detail"
        value={formData.detail}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default NewFeedback