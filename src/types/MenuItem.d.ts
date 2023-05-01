import HeroIcon from '@heroicons/*'

interface MenuItem {
  name: string
  href: string
  to: string
  icon: HeroIcon
  current: boolean
}
