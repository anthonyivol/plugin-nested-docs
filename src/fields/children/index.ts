import type { Field } from 'payload/dist/fields/config/types'
import ChildrenList from './List'

const createChildrenListField = (
  relationTo: string,
): Field => ({
  name: 'children',
  type: 'text',
  admin: {
    components: {
      Field: ChildrenList,
    },
  },
  custom: {
    collection : relationTo
  }
})

export default createChildrenListField
