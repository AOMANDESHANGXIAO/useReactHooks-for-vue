import { ref, Ref, UnwrapRef } from 'vue'

type setStateFunc<T> = (
  newValue: UnwrapRef<T> | ((prevValue: UnwrapRef<T>) => UnwrapRef<T>)
) => void

export default function useState<T>(
  initialValue: T
): [Ref<UnwrapRef<T>>, setStateFunc<T>] {
  const state: Ref<UnwrapRef<T>> = ref<T>(initialValue)

  function setState(
    newValue: UnwrapRef<T> | ((prevValue: UnwrapRef<T>) => UnwrapRef<T>)
  ) {
    if (typeof newValue === 'function') {
      // use function
      state.value = (newValue as (prevValue: UnwrapRef<T>) => UnwrapRef<T>)(
        state.value as UnwrapRef<T>
      )
    } else {
      // use value
      state.value = newValue
    }
  }

  return [state, setState]
}
