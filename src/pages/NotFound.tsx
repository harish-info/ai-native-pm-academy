import { EmptyState, LinkButton } from '../ui/primitives'

export function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      titleAs="h1"
      action={<LinkButton to="/dashboard">Go to the dashboard</LinkButton>}
    >
      The link may be out of date. Your progress is safe.
    </EmptyState>
  )
}
