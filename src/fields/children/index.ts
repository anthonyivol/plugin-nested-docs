import type { Field } from 'payload/dist/fields/config/types'
import ChildrenList from './List'

const createChildrenListField = (
  relationTo: string,
): Field => ({
  name: 'children',
  relationTo,
  hasMany : true,
  type: 'relationship',
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
