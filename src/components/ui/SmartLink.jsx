const isExternal = (href) => /^https?:\/\//.test(href)

/**
 * Anchor that opens external URLs safely. When no `href` has been provided yet, it renders an
 * inert, clearly-flagged anchor instead of a dead "#" link.
 */
export default function SmartLink({ href, children, ...rest }) {
  if (!href) {
    return (
      <a aria-disabled="true" data-missing-href="" {...rest}>
        {children}
      </a>
    )
  }

  const external = isExternal(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
