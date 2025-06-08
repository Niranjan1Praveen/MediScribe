import { NextResponse } from 'next/server'
import prisma from '@/app/utils/db' // Adjust the path based on your actual file structure

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  try {
    let patients

    if (name) {
      patients = await prisma.patient.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      })
    } else {
      patients = await prisma.patient.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      })
    }

    return NextResponse.json(patients)
  } catch (error) {
    console.error('Error fetching patient records:', error)
    return NextResponse.json({ error: 'Failed to fetch patient records' }, { status: 500 })
  }
}
