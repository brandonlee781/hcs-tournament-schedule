import { DropdownMenu } from '@/components/Elements/DropdownMenu'

import Translate from '~icons/mdi/translate'

type MenuItemProps = {
  children: React.ReactNode
  active?: boolean
  clickFn: () => void
}
const MenuItem = ({ children, active, clickFn }: MenuItemProps) => {
  return (
    <li
      className={`cursor-pointer hover:dark:bg-gray-600 hover:bg-gray-300 text-center py-2 uppercase ${
        active ? 'bg-purple-600 hover:dark:bg-purple-800' : ''
      }`}
    >
      <button className="h-full w-full" onClick={clickFn} onKeyDown={clickFn}>
        {children}
      </button>
    </li>
  )
}

export const LanguageMenu = () => {
  const [open, setOpen] = useState(false)

  const { i18n } = useTranslation()

  const setLang = (lang: string) => {
    setOpen(false)
    i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu className="ml-4 h-4 w-4 z-100" width={64} open={open} setOpen={setOpen}>
      <DropdownMenu.Activator openFn={() => setOpen(!open)}>
        <Translate />
      </DropdownMenu.Activator>
      <ul>
        <MenuItem active={i18n.language === 'en'} clickFn={() => setLang('en')}>
          EN
        </MenuItem>
        <MenuItem active={i18n.language === 'es'} clickFn={() => setLang('es')}>
          ES
        </MenuItem>
        <MenuItem active={i18n.language === 'fr'} clickFn={() => setLang('fr')}>
          FR
        </MenuItem>
      </ul>
    </DropdownMenu>
  )
}
