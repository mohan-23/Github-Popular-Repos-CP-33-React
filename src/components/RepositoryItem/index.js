import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, starsCount, name, issuesCount} = repoDetails

  return (
    <li className="repo-cart">
      <img src={avatarUrl} className="avatar-url" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="counts-cart">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="image"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="counts-cart">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="image"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="counts-cart">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="image"
          alt="open issues"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
