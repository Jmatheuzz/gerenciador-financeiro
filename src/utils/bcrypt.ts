import bcrypt from 'bcrypt'

class Bcrypt {
  public async generate (data: string): Promise<string> {
    return await bcrypt.hash(data, 10)
  }

  public async compare (data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash)
  }
}

export const hash = new Bcrypt()
