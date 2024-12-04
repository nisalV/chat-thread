import React, { useEffect, useRef, useState } from 'react'
import { ButtonBase } from '../button'
import { colors } from '../../../common/values'
import './menuDrop.css'

const styles: Record<string, React.CSSProperties> = {
  sortBy: {
    padding: '5px 10px',
  },
}

type DropdownMenuProps = {
  options: string[]
  onSelect: (option: string) => void
  label?: string
  selectedOption?: string
}

const DropdownMenu = ({
  options,
  onSelect,
  label = 'Select',
  selectedOption,
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => setIsOpen(!isOpen)

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (
      dropdownRef.current &&
      target.id !== 'list-container' &&
      target.id !== 'list-item' &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div id="menu-container">
      <ButtonBase
        label={label}
        color={colors.lightPrimary}
        style={styles.sortBy}
        onClick={handleToggle}
      />

      {isOpen && (
        <ul ref={dropdownRef} id="list-container">
          {options.map((option, index) => (
            <li
              id="list-item"
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                ...(selectedOption === option && {
                  backgroundColor: colors.menuOptionSelect,
                }),
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
