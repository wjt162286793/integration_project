import { reactive } from 'vue'
import type { UiSubAppNavigationItem, UiSubAppNavigator } from '@/ui-preferences'

export const subAppNavigation = reactive({
  items: [] as UiSubAppNavigationItem[],
  activeKey: '',
  navigate: null as UiSubAppNavigator | null,
})

export const registerSubAppNavigation = (
  items: UiSubAppNavigationItem[],
  activeKey: string,
  navigate: UiSubAppNavigator,
): void => {
  subAppNavigation.items = items
  subAppNavigation.activeKey = activeKey
  subAppNavigation.navigate = navigate
}

export const navigateSubApp = (item: UiSubAppNavigationItem): void => {
  subAppNavigation.navigate?.(item)
}
