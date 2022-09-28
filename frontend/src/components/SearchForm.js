import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchForm = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (!keyword) return
    history.push(`/search/${keyword}`)
    setKeyword('')
  }

  return (
    <form className="navbar-search-form" onSubmit={submitHandler}>
      <input type="text" className="navbar-search-input" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button type="submit" className="navbar-search-button button-success">
        Search
      </button>
    </form>
  )
}

export default SearchForm
