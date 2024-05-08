import prisma from './client'

// interface CreateUser {
//   id: number
//   plate: string
//   acceptTermsAndConditions: boolean
// }

// export async function getTaxis(user: CreateUser) {
//   if (user.acceptTermsAndConditions) {
//     return await prisma.taxis.findMany({})
//   } else {
//     return new Error('taxis must accept terms!')
//   }
// }

interface GetTaxi {
    id: number
    plate: string
    acceptTermsAndConditions: boolean
  }
  
export async function getTaxis(taxi: GetTaxi) {
  if (taxi.acceptTermsAndConditions) {
    return await prisma.taxis.findMany({})
  } else {
    return new Error('taxis must accept terms!')
  }
}

interface CreateTaxi {
    id: number
    plate: string
  }
  
export async function createTaxi(taxi: CreateTaxi) {
  // if(!taxi.id) {
  //     return Response.json("error")
  // } else{
  return await prisma.taxis.create({data: taxi})
  // }
}

interface UpdateTaxi {
  id: number
  plate: string
}

export async function updateTaxi(user: UpdateTaxi) {
  return await prisma.taxis.update({
    where: { id: user.id },
    data: user,
  })
}