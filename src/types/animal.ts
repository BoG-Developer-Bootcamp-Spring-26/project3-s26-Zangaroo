import { ObjectId } from "mongoose"

export interface AnimalOwner {
  _id: ObjectId // owner's ID
  fullName: string // owner's full name
}

export interface Animal {
  _id: ObjectId // animal's ID
  name: string // animal's name
  breed: string // animal's breed
  owner: AnimalOwner // the animal's owner
  hoursTrained: number // total number of hours the animal has been trained for
  profilePicture: string // url to an image that can be displayed in an <img> tag
}