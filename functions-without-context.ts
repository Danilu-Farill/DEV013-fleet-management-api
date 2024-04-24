import { error } from 'node:console'
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

interface UpdateUser {
  id: number
  name: string
  email: string
}

export async function updateUsername(user: UpdateUser) {
  return await prisma.trajectories.update({
    where: { id: user.id },
    data: user,
  })
}