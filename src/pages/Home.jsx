import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [feedbackList, setFeedbackList] = useState([])
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('https://product-management-app-w62f.onrender.com/get-feedback')
        const data = await res.json()
        setFeedbackList(data)
      } catch (err) {
        console.error('Failed to fetch feedback:', err)
      }
    }

    fetchFeedback()
  }, [])

  const categories = ['All', 'UI', 'UX', 'Feature', 'Enhancement', 'Bug']

  const filteredFeedback =
    filter === 'All' ? feedbackList : feedbackList.filter(item => item.category === filter)

  return (
    <div style={{ display: 'flex', padding: '2rem', gap: '2rem' }}>
      {/* Sidebar */}
      <aside>
        <div style={{ padding: '1rem', borderRadius: '8px', background: 'linear-gradient(to right, #8a2be2, #ff8aa3)', color: 'white' }}>
          <h2>My Company</h2>
          <p>Feedback Board</p>
        </div>

        <div style={{ marginTop: '1rem', background: 'white', borderRadius: '8px', padding: '1rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                margin: '0.25rem',
                fontWeight: 'bold',
                background: filter === cat ? '#4661e6' : '#f2f4ff',
                color: filter === cat ? 'white' : '#4661e6',
                border: 'none',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Section */}
      <main style={{ flex: 1 }}>
        <div style={{ background: '#3a4374', color: 'white', padding: '1rem 2rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{filteredFeedback.length} Suggestions</h2>
          <button
            onClick={() => navigate('/new-feedback')}
            style={{
              background: '#ad1fea',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            + Add Feedback
          </button>
        </div>

        {filteredFeedback.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h3>There is no feedback yet.</h3>
            <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <button
              onClick={() => navigate('/new-feedback')}
              style={{
                marginTop: '1rem',
                background: '#ad1fea',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              + Add Feedback
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            {filteredFeedback.map(item => (
              <div key={item.pm_id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span style={{ background: '#f2f4ff', color: '#4661e6', padding: '0.25rem 0.5rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' }}>{item.category}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home