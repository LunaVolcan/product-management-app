import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [feedbackList, setFeedbackList] = useState([])
  const [filter, setFilter] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
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
  const filtered =
    filter === 'All' ? feedbackList : feedbackList.filter(fb => fb.category === filter)

  return (
    <div className="container-home">
      {/* 🟣 Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-header-top">
          <div>
            <h1>Mythic Labs</h1>
            <p>Feedback Board</p>
          </div>
          <button className="hamburger" onClick={() => setMobileMenuOpen(true)}>☰</button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>✕</button>

            {/* Mobile Dropdown Filter */}
            <div className="dropdown">
              <button className="dropbtn" onClick={() => setDropdownOpen(prev => !prev)}>
                {filter || "Filter by Category"} <span className="arrow">▼</span>
              </button>

              {dropdownOpen && (
                <div className="dropdown-content">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilter(cat)
                        setDropdownOpen(false)
                        setMobileMenuOpen(false)
                      }}
                      className={`filter-btn ${filter === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* <button
              onClick={() => {
                navigate('/new-feedback')
                setMobileMenuOpen(false)
              }}
              className="add-feedback"
            >
              + Add Feedback
            </button> */}
          </div>
        </div>
      )}

      {/* 🟣 Desktop Layout */}
      <div className="left-column">
        <header className="header">
          <h1>Mythic Labs</h1>
          <p>Feedback Board</p>
        </header>

        {/* Desktop Dropdown Filter */}
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setDropdownOpen(prev => !prev)}>
            {filter || "Filter by Category"} <span className="arrow">▼</span>
          </button>

          {dropdownOpen && (
            <div className="dropdown-content">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat)
                    setDropdownOpen(false)
                  }}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

            <div className="right-column">
                <div className="content-section">
                <div className="top-bar">
        <h1>{filtered.length} Suggestions</h1>
        <div className="top-bar-button-wrapper">
            <button
            className="add-feedback"
            onClick={() => navigate('/new-feedback')}
            >
            + Add Feedback
            </button>
        </div>
        </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
                <div className="empty-shape">
              <h3>There is no feedback yet.</h3>
              <p>Got a suggestion? Found a bug? We’d love to hear from you.</p>
              <button className="empty-button" onClick={() => navigate('/new-feedback')}>
                + Add Feedback
              </button>
              </div>
            </div>
          ) : (
            <ul className="feedback-list">
              {filtered.map(item => (
                <li key={item.pm_id} className="feedback-card">
                  <h2>{item.title}</h2>
                  <p>{item.detail}</p>
                  <span className={`category-badge ${item.category.toLowerCase()}`}>
                    {item.category}
                    </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home