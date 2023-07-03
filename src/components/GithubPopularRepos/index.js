import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repoList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguageId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachObject => ({
      avatarUrl: eachObject.avatar_url,
      forksCount: eachObject.forks_count,
      id: eachObject.id,
      issuesCount: eachObject.issues_count,
      name: eachObject.name,
      starsCount: eachObject.stars_count,
    }))

    if (response.ok === true) {
      this.setState({repoList: updatedData, isLoading: false})
    } else {
      this.onFailureView()
    }
  }

  onFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  setActiveLanguageId = id => {
    this.setState({activeLanguageId: id, isLoading: true}, this.getRepos)
  }

  onSuccessView = () => {
    const {repoList} = this.state

    return (
      <ul className="repo-list-items">
        {repoList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeLanguageId, isLoading} = this.state

    return (
      <div className="repo-bg-container">
        <h1 className="repo-heading">Popular</h1>
        <ul className="repo-items-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageItem={eachLanguage}
              key={eachLanguage.id}
              setActiveLanguageId={this.setActiveLanguageId}
              isActive={activeLanguageId === eachLanguage.id}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.onSuccessView()
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
