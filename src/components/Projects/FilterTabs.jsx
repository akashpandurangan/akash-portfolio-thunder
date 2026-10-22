import styles from './FilterTabs.module.css'

export default function FilterTabs({ filters, active, onChange }) {
  return (
    <div className={styles.tabs} role="group" aria-label="Filter projects by type">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={styles.tab}
          data-active={filter === active}
          aria-pressed={filter === active}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
