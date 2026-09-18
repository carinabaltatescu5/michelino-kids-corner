import { useEffect } from 'react'

export function usePageSeo({ title, description }) {
  useEffect(() => {
    document.title = title

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.name = 'description'
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.content = description
  }, [title, description])
}
