"use client"

import { useState, useEffect } from "react"
import SearchModal from "./SearchModal"
import "../styles/SearchModal.css"

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button 
        className="search-trigger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Search"
        type="button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          style={{ width: '20px', height: '20px' }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
          />
        </svg>
        <span className="search-shortcut">⌘K</span>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <style>{`
        .search-trigger-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6B7280;
        }

        .search-trigger-btn:hover {
          background: #E5E7EB;
          color: #374151;
          border-color: #D1D5DB;
        }

        .search-shortcut {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #9CA3AF;
          background: white;
          padding: 2px 6px;
          border-radius: 5px;
          border: 1px solid #E5E7EB;
        }

        @media (max-width: 768px) {
          .search-shortcut {
            display: none;
          }
          
          .search-trigger-btn {
            padding: 8px;
            background: transparent;
            border: none;
          }
        }
      `}</style>
    </>
  )
}

