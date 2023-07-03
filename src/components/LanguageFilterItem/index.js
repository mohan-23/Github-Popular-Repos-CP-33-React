import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, setActiveLanguageId, isActive} = props
  const {id, language} = languageItem

  const onClickLanguageItem = () => {
    setActiveLanguageId(id)
  }
  const className = isActive ? 'language_item style' : 'language_item'

  return (
    <li className={className}>
      <button type="button" className="language" onClick={onClickLanguageItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
