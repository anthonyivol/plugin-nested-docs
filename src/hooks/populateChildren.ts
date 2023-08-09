import type { CollectionConfig } from 'payload/types'
import type { PluginConfig } from '../types'

const populateChildren = async (
  req: any,
  pluginConfig: PluginConfig,
  collection: CollectionConfig,
  data: any,
  originalDoc?: any,
): Promise<any> => {
  if( !originalDoc ){
    return { ...data, children : [] }
  }
  const children = await req.payload.find({
    collection: collection.slug,
    where: { parent : { equals : originalDoc.id }}
  })
  
  return {
    ...data,
    children: children.docs.map((doc:any) => doc.id )
  }
}

export default populateChildren
