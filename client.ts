import { PrismaClient } from '@prisma/client'
// import { MockContext, Context, createMockContext } from './context'


const prisma = new PrismaClient()
export default prisma



// let mockCtx: MockContext
// let ctx: Context

// beforeEach(() => {
//   mockCtx = createMockContext()
//   ctx = mockCtx as unknown as Context
// })