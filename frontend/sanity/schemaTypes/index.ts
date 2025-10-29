import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { addressType } from './addressType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { blogCategoryType } from './blogCategoryType'
import { blogType } from './blogType'
import { brandType } from './brandTypes'
import { orderType } from './orderType'
import { productType } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    addressType,
    authorType,
    blockContentType,
    blogCategoryType,
    blogType,
    brandType,
    orderType,
    productType
  ],
}
