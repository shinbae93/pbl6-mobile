import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function pop() {
  navigationRef.current?.dispatch(StackActions.pop())
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args))
}
