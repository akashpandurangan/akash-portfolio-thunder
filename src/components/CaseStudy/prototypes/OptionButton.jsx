import styles from './OptionButton.module.css'

/**
 * A player option, as specified: three styles (fill, standard, outline) in four states (default, focused, pressed,
 * disabled), as a labelled chip or an icon button. With `state="interactive"` the states come from the real pointer and
 * keyboard (hover, :focus-visible, :active); any other value pins the look so it can be inspected.
 */
export default function OptionButton({
  label,
  icon: Icon,
  variant = 'fill',
  shape = 'label',
  state = 'interactive',
  disabled = false,
  pressing = false,
  onPress,
  buttonRef,
  className = '',
  ...rest
}) {
  const pinned = state !== 'interactive'
  const effective = disabled ? 'disabled' : pinned ? state : pressing ? 'pressed' : undefined

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.option} ${className}`.trim()}
      data-variant={variant}
      data-shape={shape}
      data-state={effective}
      data-pinned={pinned || undefined}
      disabled={disabled}
      aria-label={shape === 'icon' ? label : undefined}
      onClick={onPress}
      {...rest}
    >
      {Icon && <Icon size={shape === 'icon' ? 20 : 18} strokeWidth={1.75} aria-hidden="true" />}
      {shape === 'label' && <span>{label}</span>}
    </button>
  )
}
