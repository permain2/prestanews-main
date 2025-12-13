"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useRef, useCallback } from "react"

interface SearchResult {
  title: string
  href: string
  category: string
  keywords: string
}

const searchData: SearchResult[] = [
  { title: 'Best Travel Cards', href: '/credit-cards/best-travel-cards', category: 'Credit Cards', keywords: 'travel credit card rewards points miles airport lounge' },
  { title: 'Best Cash Back Cards', href: '/credit-cards/best-cashback', category: 'Credit Cards', keywords: 'cashback cash back rewards money credit card' },
  { title: 'Business Credit Cards', href: '/credit-cards/business', category: 'Credit Cards', keywords: 'business credit card company corporate small business' },
  { title: 'No Annual Fee Cards', href: '/credit-cards/no-annual-fee', category: 'Credit Cards', keywords: 'no annual fee free credit card' },
  { title: 'Balance Transfer Cards', href: '/credit-cards/balance-transfer', category: 'Credit Cards', keywords: 'balance transfer debt 0% apr interest free' },
  { title: 'Car Insurance', href: '/insurance/car', category: 'Insurance', keywords: 'car auto vehicle insurance coverage driver' },
  { title: 'Home Insurance', href: '/insurance/home', category: 'Insurance', keywords: 'home house property insurance homeowner' },
  { title: 'Life Insurance', href: '/insurance/life', category: 'Insurance', keywords: 'life insurance term whole life death benefit' },
  { title: 'Pet Insurance', href: '/insurance/pet', category: 'Insurance', keywords: 'pet dog cat animal insurance vet veterinary' },
  { title: 'Renters Insurance', href: '/insurance/renters', category: 'Insurance', keywords: 'renters renter apartment tenant insurance' },
  { title: 'RV Insurance', href: '/blog/best-rv-insurance', category: 'Insurance', keywords: 'rv recreational vehicle camper motorhome insurance' },
  { title: 'Small Business Insurance', href: '/blog/best-small-business-insurance', category: 'Insurance', keywords: 'business small business commercial liability insurance' },
  { title: 'Online Savings Accounts', href: '/finance/best-online-savings-accounts', category: 'Finance', keywords: 'savings bank account interest apy high yield' },
  { title: 'Student Loans', href: '/blog/best-student-loans', category: 'Finance', keywords: 'student loan college university education tuition' },
  { title: 'Auto Refinance', href: '/blog/best-auto-refinance-lenders', category: 'Finance', keywords: 'auto car refinance loan rate' },
  { title: 'Mortgage Refinance', href: '/blog/best-mortgage-refinance-companies', category: 'Finance', keywords: 'mortgage refinance home loan rate lender' },
  { title: 'Gold IRA', href: '/blog/best-gold-ira-companies', category: 'Finance', keywords: 'gold ira retirement precious metals investment' },
  { title: 'Home Warranties', href: '/home/best-home-warranties', category: 'Home', keywords: 'home warranty appliance repair coverage protection' },
  { title: 'Security Cameras', href: '/blog/best-home-security-cameras', category: 'Home', keywords: 'security camera surveillance home security ring nest' },
  { title: 'Internet Providers', href: '/blog/best-internet-providers', category: 'Home', keywords: 'internet wifi broadband fiber cable provider isp' },
  { title: 'Car Transport', href: '/blog/best-car-transport-companies', category: 'Home', keywords: 'car transport auto shipping vehicle transport' },
  { title: 'VPN Services', href: '/software/best-vpn-services', category: 'Software', keywords: 'vpn privacy security virtual private network' },
]

const popularLinks = [
  { title: 'Best Travel Cards', href: '/credit-cards/best-travel-cards', category: 'Credit Cards' },
  { title: 'Car Insurance', href: '/insurance/car', category: 'Insurance' },
  { title: 'Cash Back Cards', href: '/credit-cards/best-cashback', category: 'Credit Cards' },
  { title: 'Pet Insurance', href: '/insurance/pet', category: 'Insurance' },
  { title: 'Savings Accounts', href: '/finance/best-online-savings-accounts', category: 'Finance' },
  { title: 'Student Loans', href: '/blog/best-student-loans', category: 'Finance' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<(SearchResult & { score: number })[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const terms = searchQuery.toLowerCase().split(/\s+/)
    const searchResults = searchData
      .map(item => {
        let score = 0
        const titleLower = item.title.toLowerCase()
        const categoryLower = item.category.toLowerCase()
        const keywordsLower = item.keywords.toLowerCase()

        terms.forEach(term => {
          if (titleLower.includes(term)) score += 10
          if (categoryLower.includes(term)) score += 5
          if (keywordsLower.includes(term)) score += 3
        })

        return { ...item, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)

    setResults(searchResults)
    setSelectedIndex(0)
  }, [])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    performSearch(value)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      const items = results.length > 0 ? results : popularLinks
      const maxIndex = items.length - 1

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : maxIndex))
          break
        case 'Enter':
          e.preventDefault()
          const selectedItem = items[selectedIndex]
          if (selectedItem) {
            window.location.href = selectedItem.href
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  // Highlight matching text
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) return text
    
    const terms = searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1)
    let result = text
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi')
      result = result.replace(regex, '<mark>$1</mark>')
    })
    
    return result
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const displayItems = results.length > 0 ? results : (query.length < 2 ? popularLinks : [])
  const showNoResults = query.length >= 2 && results.length === 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="search-modal-container"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              mass: 0.8
            }}
          >
            {/* Search Input */}
            <div className="search-input-wrapper">
              <motion.div 
                className="search-icon-wrapper"
                animate={{ scale: query ? 0.9 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </motion.div>
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search guides, cards, insurance..."
                className="search-input"
                autoComplete="off"
              />
              
              <AnimatePresence>
                {query && (
                  <motion.button
                    className="clear-btn"
                    onClick={() => {
                      setQuery('')
                      setResults([])
                      inputRef.current?.focus()
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                className="close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="close-hint">esc</span>
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div 
              className="search-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />

            {/* Results */}
            <div className="search-results-wrapper" ref={resultsRef}>
              {!showNoResults && displayItems.length > 0 && (
                <>
                  <motion.div 
                    className="results-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {results.length > 0 ? 'Results' : 'Popular'}
                  </motion.div>
                  
                  <div className="results-list">
                    {displayItems.map((item, index) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        className={`result-item ${selectedIndex === index ? 'selected' : ''}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.04,
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        whileHover={{ x: 4 }}
                      >
                        <motion.span 
                          className="result-number"
                          animate={{ 
                            scale: selectedIndex === index ? 1.1 : 1,
                            backgroundColor: selectedIndex === index ? '#0D2C4B' : '#F3F4F6'
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <span style={{ color: selectedIndex === index ? 'white' : '#374151' }}>
                            {index + 1}
                          </span>
                        </motion.span>
                        
                        <div className="result-content">
                          <span 
                            className="result-title"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightMatch(item.title, query) 
                            }}
                          />
                          <span className="result-category">{item.category}</span>
                        </div>

                        <motion.div 
                          className="result-arrow"
                          animate={{ 
                            opacity: selectedIndex === index ? 1 : 0,
                            x: selectedIndex === index ? 0 : -10
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </>
              )}

              {showNoResults && (
                <motion.div 
                  className="no-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="no-results-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                      <path d="M8 8l6 6M14 8l-6 6" />
                    </svg>
                  </div>
                  <p className="no-results-title">No results found</p>
                  <p className="no-results-hint">Try "travel cards" or "pet insurance"</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <motion.div 
              className="search-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="footer-hints">
                <span className="hint">
                  <kbd>↑</kbd><kbd>↓</kbd> navigate
                </span>
                <span className="hint">
                  <kbd>↵</kbd> select
                </span>
                <span className="hint">
                  <kbd>esc</kbd> close
                </span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

