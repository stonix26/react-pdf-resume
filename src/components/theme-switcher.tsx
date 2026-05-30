import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { HugeiconsIcon } from '@hugeicons/react'
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { Toggle } from '@/components/ui/toggle'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Toggle
        variant='outline'
        size='default'
        className='size-7 min-w-7 px-0'
        disabled
        aria-label='Theme'
      >
        <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
      </Toggle>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Toggle
      variant='outline'
      size='default'
      className='size-7 min-w-7 px-0'
      pressed={isDark}
      onPressedChange={pressed => setTheme(pressed ? 'dark' : 'light')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <HugeiconsIcon icon={isDark ? Moon02Icon : Sun03Icon} strokeWidth={2} />
    </Toggle>
  )
}
