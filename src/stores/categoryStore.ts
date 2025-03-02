import { axios } from '@/plugins'
import type { Category } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const fetch = () => {
    return new Promise((resolve, reject) => {
      axios.get('categories').then(
        ({ data }) => {
          categories.value = data.data.items
          resolve(true)
        },
        () => reject()
      )
    })
  }

  const getCategoryOptions = () => categories.value.map((c) => ({ label: c.name, value: c.id }))

  return { fetch, getCategoryOptions }
})
