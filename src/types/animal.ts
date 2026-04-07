import { ObjectId } from "mongoose"

export interface Animal {
  _id: ObjectId // animal's ID
  name: string // animal's name
  breed: string // animal's breed
  owner: ObjectId // id of the animal's owner
  hoursTrained: number // total number of hours the animal has been trained for
  profilePicture: string // url to an image that can be displayed in an <img> tag
}