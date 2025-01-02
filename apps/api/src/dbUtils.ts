import { connect } from 'mongoose'

export async function connectToDB() {
  try {
    await connect('mongodb://127.0.0.1:27017/ledger')

    console.log('Connected To DB')
  } catch(error: unknown) {
    console.log('Can not connect to the DB')

    if(error instanceof Error) {
      console.log(error.message)
    }
  }
}
