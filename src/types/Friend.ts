export type Friend = {
  id: number,
  photo_200_orig: string,
  track_code: string,
  first_name: string,
  last_name: string,
  can_access_closed: boolean,
  is_closed: boolean,
  bdate: string,
  city: {
    id: number,
    title: string
  },
  online: number,
  sex: number,
  nickname: string,
  yourself: boolean
}
