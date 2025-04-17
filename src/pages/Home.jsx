import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [feedbackList, setFeedbackList] = useState([])
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await fetch('https://product-management-app-w62f.onrender.com/get-feedback')
      const data = await res.json()
      setFeedbackList(data)
    }
    fetchFeedback()
  }, [])

  const categories = ['All', 'UI', 'UX', 'Feature', 'Enhancement', 'Bug']
  const filtered = filter === 'All'
    ? feedbackList
    : feedbackList.filter(fb => fb.category === filter)

  return (
    <div>
      <h2>My Company</h2>
      <p>Feedback Board</p>

      <div>
        <h3>{filtered.length} Suggestions</h3>
        <button onClick={() => navigate('/new-feedback')}>+ Add Feedback</button>
      </div>

      <div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div>
          <h4>No feedback yet.</h4>
          <p>Be the first to submit!</p>
          <button onClick={() => navigate('/new-feedback')}>+ Add Feedback</button>
        </div>
      ) : (
        <ul>
          {filtered.map(item => (
            <li key={item.pm_id}>
              <strong>{item.title}</strong> – {item.category}
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home