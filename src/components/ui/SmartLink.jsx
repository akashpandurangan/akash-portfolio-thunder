const isExternal = (href) => /^https?:\/\//.test(href)

/**
 * Anchor that opens external URLs (and anything flagged `newTab`, such as the resume PDF) in a new window, safely.
 * Screen readers are told when a link does that. When no `href` has been provided yet, it renders an
 * inert, clearly-flagged anchor instead of a dead "#" link.
 */
export default function SmartLink({ href, newTab = false, children, ...rest }) {
  if (!href) {
    return (
      <a aria-disabled="true" data-missing-href="" {...rest}>
        {children}
      </a>
    )
  }

  const opensNewTab = newTab || isExternal(href)
  return (
    <a href={href} {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
      {opensNewTab && !rest['aria-label'] && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  )
}
